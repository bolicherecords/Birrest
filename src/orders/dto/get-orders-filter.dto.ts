import { OrderStatus } from '../order-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetOrdersFilterDto{
	@IsOptional()
	@IsIn([OrderStatus.CREATED, OrderStatus.IN_PROGRESS, OrderStatus.TRANSIT, OrderStatus.DONE])
	status: OrderStatus;
	
	@IsOptional()
	@IsNotEmpty()
	search: string;
}
