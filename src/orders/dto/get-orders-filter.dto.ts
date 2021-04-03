import { OrderStatus } from '../order.model';

export class GetOrdersFilterDto{
	status: OrderStatus;
	search: string;
}
