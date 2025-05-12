import { fromHono } from "chanfana";
import { Hono } from "hono";
import { Bindings } from "bindings";
import { apiKeyAuthMiddleware } from "middleware/auth";

import { RequestEcho } from "endpoints/RequestEcho";
import { geoip2cn } from "endpoints/GeoIP2CN";

const app = new Hono<{ Bindings: Bindings }>();

const openapi = fromHono(app, {
	docs_url: "/",
});

openapi.get("/echo/get", RequestEcho);
openapi.put("/echo/put", RequestEcho);
openapi.post("/echo/post", RequestEcho);
openapi.delete("/echo/delete", RequestEcho);

app.get("/geoip2cn/:format?", apiKeyAuthMiddleware, geoip2cn);

export default app;
