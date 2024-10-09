import {z} from "zod";
import {Bool, Num} from "chanfana";
import {NotificationSchema} from "../entities/notification.entity";

export const listSchemaValidator = {
    tags: ["Notifications"],
    summary: "List Service Notification",
    request: {
        query: z.object({
            page: Num({
                description: "Page number",
                default: 1,
                required: false,
                example: 1,
            }),
        }),
    },
    responses: {
        "200": {
            description: "Returns a list of Notifications",
            content: {
                "application/json": {
                    schema: z.object({
                        success: Bool(),
                        result: z.object({
                            data: NotificationSchema.array(),
                        }),
                        pagination: z.object({
                            currentPage: z.number(),
                            totalPages: z.number(),
                            totalCount: z.number(),
                        }),
                    }),
                },
            },
        },
    },
};