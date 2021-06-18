import { Order } from './order.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './order-status.enum';
import { GetOrdersFilterDto } from './dto/get-orders-filter.dto';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
    async getOrders(filterDto: GetOrdersFilterDto): Promise<Order[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('order');

        if (status){
            query.andWhere('order.status = :status', { status });
        }

        if (search){
            query.andWhere('(LOWER(order.client_email) LIKE LOWER(:search) OR LOWER(order.client_name) LIKE LOWER(:search) OR LOWER(order.client_phone) LIKE LOWER(:search) OR LOWER(order.product_name) LIKE LOWER(:search))', { search: `%${search}%` });
        }
        const orders = await query.getMany();
        return orders;
    }

    async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
        const { client_name, client_phone, client_email, product_name } = createOrderDto;

        const order = new Order();
        order.client_email = client_email;
        order.client_name = client_name;
        order.client_phone = client_phone;
        order.product_name = product_name;
        order.status = OrderStatus.CREATED;
        await order.save();

        return order;
    }
}
