import { OrderRepository } from "./order.repository";
import { OrdersService } from "./orders.service";
import { Test } from '@nestjs/testing';
import { OrderStatus } from "./order-status.enum";
import { NotFoundException } from "@nestjs/common";
import { User } from "src/auth/user.entity";

const mockOrderRepository = () => ({
  getOrders: jest.fn(),
  findOne: jest.fn(),
});

const mockUser: any = {
  id: 666,
  username: 'someUser',
  password: 'somePassword',
  orders: [],
};

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let orderRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: OrderRepository, useFactory: mockOrderRepository },
      ],
    }).compile();  

    ordersService = module.get(OrdersService);
    orderRepository = module.get(OrderRepository);
  });

  describe('getOrders', () => {
    it('calls OrderRepository.getOrders and returns the result', async () => {
      orderRepository.getOrders.mockResolvedValue('someValue');
      const result = await ordersService.getOrders( null, mockUser );
      expect(result).toEqual('someValue');
    });
  });

  describe('getOrderById', () => {
    it('calls OrderRepository.findOne and returns the result', async () => {
      const mockOrder = {
        id: 666,
        client_phone: '223190',
        client_email: 'some@email.com',
        product_name: 'someProduct',
        status: OrderStatus.CREATED,
      }

      orderRepository.findOne.mockResolvedValue(mockOrder);
      const result = await ordersService.getOrderById(666, mockUser);
      expect(result).toEqual(mockOrder);
    });

    it('calls OrderRepository.findOne and handles an error', async () => {
      orderRepository.findOne.mockResolvedValue(null);
      expect(ordersService.getOrderById(666, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
