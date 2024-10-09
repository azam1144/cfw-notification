import { OpenAPIRoute } from "chanfana";
import {getPage, pagination} from "../core/utils";
import {listSchemaValidator} from "../swagger/list.schema.validator";
import {Notification} from "../entities/notification.entity";

export class ListAllNotifications extends OpenAPIRoute {
	schema = listSchemaValidator;

	async handle(c) {
		const data = await this.getValidatedData<typeof this.schema>();
		let { page } = data.query;
		page = getPage(page);

		const keys = await c.env.NOTIFICATION_KV.list();
		const {totalPages, startIndex, endIndex} = pagination(page, keys.keys.length);

		const notifications: Notification[] = [];
		for (const key of keys.keys.slice(startIndex, endIndex)) {
			const notification = await c.env.NOTIFICATION_KV.get(key.name);
			if (notification) {
				notifications.push(JSON.parse(notification) as Notification);
			}
		}

		return c.json({
			success: true,
			result: {
				data: notifications
			},
			pagination: {
				currentPage: page,
				totalPages: totalPages,
				totalCount: keys.keys.length,
			},
		}, 200);
	}
}
