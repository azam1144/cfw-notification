import {z} from "zod";
import {Bool, Str} from "chanfana";
import {NotificationSchema} from "../entities/notification.entity";

export const DeleteSchemaValidator = {
    tags: ["Notifications"],
    summary: "Delete Service a Notification",
    request: {
        params: z.object({
            id: Str({ description: "Notification ID" }),
        }),
    },
    responses: {
        "200": {
            description: "Returns if the Notification was deleted successfully",
            content: {
                "application/json": {
                    schema: z.object({
                        success: Bool(),
                        result: z.object({
                            data: NotificationSchema,
                        }),
                    }),
                },
            },
        },
    },
};