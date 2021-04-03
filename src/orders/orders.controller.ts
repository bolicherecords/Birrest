import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.model';

@Controller('orders')
export class OrdersController {
	constructor(private ordersService: OrdersService) {}

	@Get()
	getAllOrders(): Order[] {
		return this.ordersService.getAllOrders();
	}

	@Post()
	createOrder(
		@Body('client_name') client_name: string,
		@Body('client_phone') client_phone: string,
		@Body('client_email') client_email: string,
		@Body('product_name') product_name: string,
	 ): Order {
		return this.ordersService.createOrder(client_name, client_phone, client_email, product_name);
	}
}
