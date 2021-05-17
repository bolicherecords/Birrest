import { Injectable, NotFoundException } from '@nestjs/common';
import { Order, OrderStatus } from './order.model';
import { v1 as uuid} from 'uuid';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersFilterDto } from './dto/get-orders-filter.dto';

@Injectable()
export class OrdersService {
	private orders: Order[] = [];

	getAllOrders(): Order[] {
		return this.orders;
	}

	getOrdersWithFilters(filterDto: GetOrdersFilterDto): Order[]{
		const { status, search } = filterDto;
		let orders = this.getAllOrders();
		if(status){
			orders = orders.filter(order => order.status === status);
		}

		if (search) {
			orders = orders.filter(order =>
				order.client_name.includes(search) ||
				order.client_phone.includes(search) ||
				order.client_email.includes(search) ||
				order.product_name.includes(search),
			);
		}

		return orders;
	}

	getOrderById(id: string): Order {
		const found = this.orders.find(order => order.id === id);

		if (!found){
			throw new NotFoundException('Order with ID "${id}" not found');
		}

		return found;
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

	deleteOrder(id: string): void {
		const found = this.getOrderById(id);
		this.orders = this.orders.filter(order => order.id !== found.id);
	}

	updateStatus(id: string, status: OrderStatus): Order {
		const order = this.getOrderById(id);
		order.status = status;
		return order;
	}
}
