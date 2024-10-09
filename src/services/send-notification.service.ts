import { DateTime } from "luxon";
import { OpenAPIRoute } from "chanfana";
import { v4 as uuidv4 } from "uuid";
import { NotificationStatus } from "../const/notification-status";
import { SendSchemaValidator } from "../swagger/send.schema.validator";
import { Notification, NotificationSchema } from "../entities/notification.entity";
import { SendEmailService } from "./Send-email.service";
import { serializeResponse } from "../core/utils";
import { RpcService } from "./rpc.service";

const sendEmailService = new SendEmailService();

export class SendNotificationService extends OpenAPIRoute {
	schema = SendSchemaValidator;

	// Handle sending notifications
	async handle(context) {
		const rpcService = new RpcService(context);

		const payload = await context.req.json();
		try {
			// Create notification object
			const notification: Notification = {
				id: uuidv4(),
				status: NotificationStatus,
				createdAt: DateTime.now().toISO(),
				updatedAt: DateTime.now().toISO(),
				...payload,
			};

			// Validate and store notification data
			const notificationData = NotificationSchema.parse(notification);
			await context.env.NOTIFICATION_KV.put(notificationData.id, JSON.stringify(notificationData));

			// Retrieve customer record
			let customerRecord = await rpcService.getOneCustomer(payload.customer_id);
			customerRecord = serializeResponse(customerRecord);

			// Prepare and send email
			const emailPayload = {
				to: customerRecord['email'],
				from: 'no-reply@xyz.com',
				subject: 'Billing SaaS Service Email',
				content: payload.content,
			};
			const emailResp = await sendEmailService.send(context, emailPayload);
			console.log('Email Response: ', emailResp);

			// Return success response
			return context.json({
				success: true,
				result: {
					data: notificationData,
				},
			}, 201);
		} catch (err) {
			// Handle errors and return failure response
			return context.json({
				success: false,
				message: err.message,
			}, 402);
		}
	}
}