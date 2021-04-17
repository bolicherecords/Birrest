import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order, OrderStatus } from './order.model';
import { CreateOrderDto } from './dto/create-order.dto'
import { GetOrdersFilterDto } from './dto/get-orders-filter.dto'
import { OrderStatusValidationPipe } from './pipes/order-status-validation.pipe';

@Controller('orders')
export class OrdersController {
	constructor(private ordersService: OrdersService) {}

	@Get()
	index(@Query(ValidationPipe) filterDto: GetOrdersFilterDto): Order[] {
		if(Object.keys(filterDto).length){
			return this.ordersService.getOrdersWithFilters(filterDto)
		}else{
			return this.ordersService.getAllOrders();
		}
	}

	@Get('/:id')
	show(@Param('id') id: string){
		return this.ordersService.getOrderById(id);
	}

	@Post()
	@UsePipes(ValidationPipe)
	create(@Body() createOrderDto: CreateOrderDto): Order {
		return this.ordersService.createOrder(createOrderDto);
	}

	@Delete('/:id')
	delete(@Param('id') id: string): void{
		this.ordersService.deleteOrder(id);
	}

	@Patch('/:id/status')
	updateStatus(
		@Param('id') id: string,
		@Body('status', OrderStatusValidationPipe) status: OrderStatus,
	): Order{
		return this.ordersService.updateStatus(id, status);
	}
}
