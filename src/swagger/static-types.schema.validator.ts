import {z} from "zod";
import {Bool} from "chanfana";

export const StaticTypesSchemaValidator = {
    tags: ["Static Values"],
    summary: "List of all static type for Notification module",
    responses: {
        "200": {
            description: "Returns a list of all static type in Notification module",
            content: {
                "application/json": {
                    schema: z.object({
                        success: Bool(),
                        result: z.object({})
                    }),
                },
            },
        },
    },
};