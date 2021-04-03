import { Controller, Get, Post, Body, Param, Delete} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.model';
import { CreateOrderDto } from './dto/create-order.dto'

@Controller('orders')
export class OrdersController {
	constructor(private ordersService: OrdersService) {}

	@Get()
	index(): Order[] {
		return this.ordersService.getAllOrders();
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
}
