import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Context } from "hono";

export class RequestEcho extends OpenAPIRoute {
	schema = {
		tags: ["HTTP Request"],
		summary: "Echo HTTP requests",
		request: {
			query: z.object({
				anyParam: z.string({description: 'Any parameter can be passed'}).optional(),
			}).passthrough(),
			body: {
				content: {
					"plain/text": {
						schema: z.any(),
						example: "",
					},
				},
			},
		},
		responses: {
			"200": {
				description: "Request's parameters",
				content: {
					"application/json": {
						schema: z.object({
							series: z.object({
								url: z.string(),
								path: z.string(),
								method: z.string(),
								queries: z.object({}).passthrough(),
								headers: z.object({}).passthrough(),
								body: z.any(),
							}),
						}),
					},
				},
			},
		},
	};

	async handle(c: Context) {
		// Get validated data
		const data = await this.getValidatedData<typeof this.schema>();

		return {
			url: c.req.url,
			path: c.req.path,
			method: c.req.method,
			queries: c.req.queries(),
			headers: c.req.header(),
			// body: c.req.header("content-type") == "application/json" ? data.body : data.body,
			body: await c.req.text(),
		};
	};
};
