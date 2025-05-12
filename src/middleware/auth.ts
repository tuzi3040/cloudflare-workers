import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export const apiKeyAuthMiddleware = async (c: Context, next) => {
    const apiKey = c.req.query('key');
    if (!apiKey || apiKey !== c.env.API_KEY) {
        throw new HTTPException(404);
    }
    await next();
};
