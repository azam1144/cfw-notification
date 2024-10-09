import { OpenAPIRoute } from "chanfana";
import {DeleteSchemaValidator} from "../swagger/delete.schema.validator";

export class DeleteNotificationService extends OpenAPIRoute {
	schema = DeleteSchemaValidator;

	async handle(c) {
		const id = c.req.param('id');
		const existing = await c.env.PAYMENT_KV.get(id);
		if (!existing) {
			return c.json({ success: false, error: 'Invalid Payment ID' }, 404);
		}

		await c.env.PAYMENT_KV.delete(id);

		return c.json({
			success: true,
			result: {
				data: JSON.parse(existing)
			}
		}, 200);
	}
}
