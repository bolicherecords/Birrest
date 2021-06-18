import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
	@IsNotEmpty()
	client_name: string;

	@IsNotEmpty()
	client_phone: string;

	client_email: string;

	@IsNotEmpty()
	product_name: string;
}
