import { Injectable } from '@nestjs/common';
import { Order, OrderStatus } from './order.model';
import { v1 as uuid} from 'uuid'
import { CreateOrderDto } from './dto/create-order.dto'

@Injectable()
export class OrdersService {
	private orders: Order[] = [];

	getAllOrders(): Order[] {
		return this.orders;
	}

	createOrder(createOrderDto: CreateOrderDto): Order {
		const { client_name, client_phone, client_email, product_name } = createOrderDto;

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
