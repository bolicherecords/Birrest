import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from 'typeorm';
import { OrderStatus } from './order-status.enum';

@Entity()
export class Order extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

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

	@ManyToOne((_type) => User, user => user.orders , { eager: false })
	//Serialize
	@Exclude({ toPlainOnly: true })
	user: User;
}
