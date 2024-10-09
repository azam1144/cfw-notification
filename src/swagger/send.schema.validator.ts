import {z} from "zod";
import {Bool} from "chanfana";
import {CreateInvoiceNotificationSchema, NotificationSchema} from "../entities/notification.entity";

export const SendSchemaValidator = {
    tags: ["Notifications"],
    summary: "Create a new Notification",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: CreateInvoiceNotificationSchema,
                },
            },
        },
    },
    responses: {
        "200": {
            description: "Returns the notification record",
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