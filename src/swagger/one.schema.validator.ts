import {z} from "zod";
import {Bool, Str} from "chanfana";
import {NotificationSchema} from "../entities/notification.entity";

export const OneSchemaValidator = {
    tags: ["Notifications"],
    summary: "Get One Notification details",
    request: {
        params: z.object({
            id: Str({ description: "Notification ID" }),
        }),
    },
    responses: {
        "200": {
            description: "Returns a Notification details",
            content: {
                "application/json": {
                    schema: z.object({
                        success: Bool(),
                        result: z.object({
                            data: NotificationSchema.array(),
                        })
                    }),
                },
            },
        },
    },
};