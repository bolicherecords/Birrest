import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

	async getOrderById(id: number): Promise<Order>{
		const found = await this.orderRepository.findOne(id);
		
		if (!found){
			throw new NotFoundException(`Order with ID "${id}" not found`);
		}

		return found;	
	}

	async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
		return this.orderRepository.createOrder(createOrderDto);
	}

	async deleteOrder(id: number): Promise<void> {
		const result = await this.orderRepository.delete(id);
		
		if (result.affected === 0){
			throw new NotFoundException(`Order with ID "${id}" not found`);
		}
	}

	async updateStatus(id: number, status: OrderStatus){
		const order = await this.getOrderById(id);
		order.status = status;
		await order.save();
		return order;
	}

	async getOrders(filterDto: GetOrdersFilterDto): Promise<Order[]> {
		return this.orderRepository.getOrders(filterDto);
	}
}
