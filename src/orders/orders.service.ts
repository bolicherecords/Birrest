import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersFilterDto } from './dto/get-orders-filter.dto';
import { OrderStatus } from './order-status.enum';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrdersService {
	constructor(
		@InjectRepository(OrderRepository)
		private orderRepository: OrderRepository,
	){}

	async getOrderById(id: number, user: User): Promise<Order>{
		const found = await this.orderRepository.findOne({ where: { id, user } });
		
		if (!found){
			throw new NotFoundException(`Order with ID "${id}" not found`);
		}

		return found;	
	}

	async createOrder(createOrderDto: CreateOrderDto, user: User): Promise<Order> {
		return this.orderRepository.createOrder(createOrderDto, user);
	}

	async deleteOrder(id: number, user: User): Promise<void> {
		const result = await this.orderRepository.delete({ id, user });
		
		if (result.affected === 0){
			throw new NotFoundException(`Order with ID "${id}" not found`);
		}
	}

	async updateStatus(id: number, status: OrderStatus, user: User){
		const order = await this.getOrderById(id, user);
		order.status = status;
		await order.save();
		return order;
	}

	async getOrders(filterDto: GetOrdersFilterDto, user: User): Promise<Order[]> {
		return this.orderRepository.getOrders(filterDto, user);
	}
}
