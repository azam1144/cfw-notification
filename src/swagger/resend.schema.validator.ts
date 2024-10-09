import {z} from "zod";
import {Bool, Str} from "chanfana";
import {NotificationSchema} from "../entities/notification.entity";

const NotificationContentSchema = NotificationSchema.pick({ content: true });

export const ResendSchemaValidator = {
    tags: ["Notifications"],
    summary: "Get One Notification details",
    request: {
        params: z.object({
            id: Str({ description: "Notification ID" }),
        }),
        body: {
            content: {
                "application/json": {
                    schema: NotificationContentSchema,
                },
            },
        },
    },
    responses: {
        "200": {
            description: "Returns a Notification details",
            content: {
                "application/json": {
                    schema: z.object({
                        success: Bool(),
                        result: z.object({
                            data: NotificationContentSchema.array(),
                        })
                    }),
                },
            },
        },
    },
};