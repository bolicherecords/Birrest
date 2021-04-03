import { Controller, Get, Post, Body, Param, Delete, Patch, Query} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order, OrderStatus } from './order.model';
import { CreateOrderDto } from './dto/create-order.dto'
import { GetOrdersFilterDto } from './dto/get-orders-filter.dto'

@Controller('orders')
export class OrdersController {
	constructor(private ordersService: OrdersService) {}

	@Get()
	index(@Query() filterDto: GetOrdersFilterDto): Order[] {
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
		@Body('status') status: OrderStatus,
	): Order{
		return this.ordersService.updateStatus(id, status);
	}
}
