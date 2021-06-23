import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto'
import { GetOrdersFilterDto } from './dto/get-orders-filter.dto'
import { OrderStatusValidationPipe } from './pipes/order-status-validation.pipe';
import { Order } from './order.entity';
import { OrderStatus } from './order-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('orders')
@UseGuards(AuthGuard())
export class OrdersController {
	private logger = new Logger('OrdersController');
	constructor(private ordersService: OrdersService) {}
	
	@Get()
	getOrders(@Query(ValidationPipe) filterDto: GetOrdersFilterDto, @GetUser() user: User): Promise<Order[]> {
		return this.ordersService.getOrders(filterDto, user);
	}

	@Get('/:id')
	show(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Order> {
		this.logger.debug('Im in Show Contoller');
		return this.ordersService.getOrderById(id, user);
	}

	@Post()
	@UsePipes(ValidationPipe)
	create(
		@Body() createOrderDto: CreateOrderDto,
		@GetUser() user: User,
	): Promise<Order> {
		return this.ordersService.createOrder(createOrderDto, user);
	}

	@Delete('/:id')
	delete(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
		return this.ordersService.deleteOrder(id, user);
	}

	@Patch('/:id/status')
	updateStatus(
		@Param('id', ParseIntPipe) id: number,
		@Body('status', OrderStatusValidationPipe) status: OrderStatus,
		@GetUser() user: User,
	): Promise<Order>{
		return this.ordersService.updateStatus(id, status, user);
	}
}
