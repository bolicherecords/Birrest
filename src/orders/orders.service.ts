import { Injectable } from '@nestjs/common';
import { Order, OrderStatus } from './order.model';
import { v1 as uuid} from 'uuid'

@Injectable()
export class OrdersService {
	private orders: Order[] = [];

	getAllOrders(): Order[] {
		return this.orders;
	}

	createOrder(client_name: string, client_phone: string, client_email: string, product_name: string) {
		const order: Order = {
			id: uuid(),
			client_name,
			client_phone,
			client_email,
			product_name,
			status: OrderStatus.CREATED,
		};

		this.orders.push(order);
		return order;
	}
}
