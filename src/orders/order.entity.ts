import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { OrderStatus } from './order.model'

@Entity()
export class Order extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	client_name: string;

	@Column()
	client_phone: string;

	@Column()
	client_email: string;

	@Column()
	product_name: string;

	@Column()
	status: OrderStatus;
}
