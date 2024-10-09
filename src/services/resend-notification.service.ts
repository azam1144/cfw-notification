import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import {OpenAPIRoute} from "chanfana";
import {NotificationStatus} from "../const/notification-status";
import {ResendSchemaValidator} from "../swagger/resend.schema.validator";
import {Notification, NotificationSchema} from "../entities/notification.entity";

export class ResendNotificationService extends OpenAPIRoute {
    schema = ResendSchemaValidator;

    async handle(c) {
        const result = NotificationSchema.safeParse(await c.req.json());
        console.log('result: ', result);
        if (!result.success) {
            // return c.json({ success: false, error: 'Invalid Payment data', details: result.error }, 400);
        }

        const payload = await c.req.json();

        try {
            // const invoiceRecord = await api(`${API_SERVERS.PAYMENT_PROCESSING}/invoice/one/${payload.invoice_id}`, 'GET');
            // console.log('invoiceRecord: ', invoiceRecord);
            //
            // const customerRecord = await api(`${API_SERVERS.SUBSCRIPTION}/customer/one/${payload.customer_id}`, 'GET');
            // console.log('customerRecord: ', customerRecord);
            //

            const notification: Notification = {
                id: uuidv4(),
                status: NotificationStatus.DELIVERED,
                createdAt: DateTime.now().toISO(),
                updatedAt: DateTime.now().toISO(),
                ...payload,
                content: 'Payment is processed successfully!',
            };

            console.log('notification: ', notification);
            const notificationData = NotificationSchema.parse(notification);
            await c.env.NOTIFICATION_KV.put(notificationData.id, JSON.stringify(notificationData));

            return c.json({
                success: true,
                result: {
                    data: notificationData
                }
            }, 201);
        }catch (err) {
            return c.json({
                success: false,
                message: err.message,
            }, 201);
        }
    }
}
