import { Context } from "hono";

export async function geoip2cn(c: Context) {
    const CNIPCidr = await (await fetch("https://raw.githubusercontent.com/Hackl0us/GeoIP2-CN/release/CN-ip-cidr.txt")).text();
    switch (c.req.param("format")) {
        case "surge":
            return new Response(CNIPCidr.split("\n").map(l => "IP-CIDR," + l).join("\n"), {
                status: 200,
            })
        case "proxifier":
            return new Response(CNIPCidr.split("\n").join("; "), {
                status: 200,
            });
        default:
            return new Response(CNIPCidr, {
                status: 200,
            });
    }
}
