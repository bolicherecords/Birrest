import { PipeTransform, BadRequestException } from '@nestjs/common';
import { OrderStatus } from '../order.model'

export class OrderStatusValidationPipe implements PipeTransform {
	readonly allowedStatuses = [
		OrderStatus.CREATED,
		OrderStatus.IN_PROGRESS,
		OrderStatus.TRANSIT,
		OrderStatus.DONE,
	];

	transform(value: any){
		value = value.toUpperCase();

		if (!this.isStatusValid(value)){
			throw new BadRequestException('"${value}" is an invalid status');
		}
		return value;
	}

	private isStatusValid(status: any){
		const idx = this.allowedStatuses.indexOf(status);

		return idx !== -1;

	}
}