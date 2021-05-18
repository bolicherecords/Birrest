import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto'
import { GetOrdersFilterDto } from './dto/get-orders-filter.dto'
import { OrderStatusValidationPipe } from './pipes/order-status-validation.pipe';
import { Order } from './order.entity';
import { OrderStatus } from './order-status.enum';

@Controller('orders')
export class OrdersController {
	constructor(private ordersService: OrdersService) {}
	
	@Get()
	getOrders(@Query(ValidationPipe) filterDto: GetOrdersFilterDto): Promise<Order[]> {
		return this.ordersService.getOrders(filterDto);
	}

	@Get('/:id')
	show(@Param('id', ParseIntPipe) id: number): Promise<Order> {
		return this.ordersService.getOrderById(id);
	}

	@Post()
	@UsePipes(ValidationPipe)
	create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
		return this.ordersService.createOrder(createOrderDto);
	}

	@Delete('/:id')
	delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.ordersService.deleteOrder(id);
	}

	@Patch('/:id/status')
	updateStatus(
		@Param('id', ParseIntPipe) id: number,
		@Body('status', OrderStatusValidationPipe) status: OrderStatus,
	): Promise<Order>{
		return this.ordersService.updateStatus(id, status);
	}
}
