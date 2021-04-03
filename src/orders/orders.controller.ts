import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.model';
import { CreateOrderDto } from './dto/create-order.dto'

@Controller('orders')
export class OrdersController {
	constructor(private ordersService: OrdersService) {}

	@Get()
	getAllOrders(): Order[] {
		return this.ordersService.getAllOrders();
	}

	@Post()
	createOrder(@Body() createOrderDto: CreateOrderDto): Order {
		return this.ordersService.createOrder(createOrderDto);
	}
}
