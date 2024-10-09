import {OpenAPIRoute} from "chanfana";
import {NotificationStatus} from "../const/notification-status";
import {StaticTypesSchemaValidator} from "../swagger/static-types.schema.validator";

export class StaticTypesService extends OpenAPIRoute {
	schema = StaticTypesSchemaValidator;
	async handle(context: any): Promise<any> {
		return {
			notificationStatus: Object.values(NotificationStatus),
		}
	}
}
