import {Context} from "hono";
import {api, ApiResponse} from "../core/utils";

export class RpcService {
    private context;
    constructor(context: Context) {
        this.context = context;
    }

    async getOneCustomer(id: string): Promise<ApiResponse> {
        return await api(`${this.context.env.SUBSCRIPTION_WORKER_URL}/customer/one/${id}`, 'GET');
    }

    async getOneInvoice(id: string): Promise<ApiResponse> {
        return await api(`${this.context.env.INVOICE_WORKER_URL}/invoice/one/${id}`, 'GET');
    }

    async getOnePayment(id: string): Promise<ApiResponse> {
        return await api(`${this.context.env.PAYMENT_WORKER_URL}/payment/one/${id}`, 'GET');
    }
}