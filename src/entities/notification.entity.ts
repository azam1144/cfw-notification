import { z } from "zod";
import {v4 as uuidv4} from "uuid";

export const NotificationSchema = z.object({
	id: z.string().default(() => uuidv4()),
	customer_id: z.string().optional(),
	invoice_id: z.string().optional(),
	payment_id: z.string().optional(),
	content: z.string().optional(),
});

export type NotificationInput = z.infer<typeof NotificationSchema>;
export type Notification = NotificationInput & {
	status: string;
	createdAt: string;
	updatedAt: string;
};

export const CreateNotificationSchema = NotificationSchema.omit({ id: true });
export const CreateInvoiceNotificationSchema = NotificationSchema.omit({ id: true, payment_id: true });
