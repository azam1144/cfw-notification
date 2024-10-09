import { Hono } from "hono";
import { fromHono } from "chanfana";
import { OneNotificationService } from "./services/one.service";
import { ListAllNotifications } from "./services/list.service";
import { SendNotificationService } from "./services/send-notification.service";

const app = new Hono();

const openapi = fromHono(app, {
	docs_url: "/",
});

openapi.get("/api/v0.1/notification", ListAllNotifications);
openapi.post("/api/v0.1/notification/one/:id", OneNotificationService);
openapi.post("/api/v0.1/notification/send", SendNotificationService);

export default app;
