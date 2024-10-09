import { OpenAPIRoute } from "chanfana";
import { RpcService } from "./rpc.service";
import { serializeResponse } from "../core/utils";
import { OneSchemaValidator } from "../swagger/one.schema.validator";

export class OneNotificationService extends OpenAPIRoute {
	schema = OneSchemaValidator;

	async handle(context) {
		const rpcService = new RpcService(context);
		const id = context.req.param('id');
		const existing = await context.env.NOTIFICATION_KV.get(id);
		if (!existing) {
			return context.json({ success: false, error: 'Invalid notification' }, 404);
		}

		const parsed = JSON.parse(existing);
		const invoiceRecord = await rpcService.getOneInvoice(parsed.invoice_id);
		const customerRecord = await rpcService.getOneInvoice(parsed.customer_id);
		const paymentRecord = await rpcService.getOneInvoice(parsed.payment_id);

		return context.json({
			success: true,
			result: {
				data: {
					...parsed,
					raw_data: {
						receiver: serializeResponse(customerRecord),
						invoice: serializeResponse(invoiceRecord),
						payment: serializeResponse(paymentRecord)
					}
				}
			}
		}, 201);
	}
}
