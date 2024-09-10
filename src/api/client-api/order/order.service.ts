import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/common/models/order.entity';
import { Product } from 'src/common/models/product.entity';
import { User } from 'src/common/models/user.entity';
import { DataSource, Decimal128, Repository } from 'typeorm';
import { CreateOrderItemDto } from './orderDto/order.create.dto';
import { OrderItem } from "src/common/models/orderItem.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Order)
    private OrderRepository: Repository<Order>,
    @InjectRepository(User)
    private UserRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async order(id: number, orders: CreateOrderItemDto[]) {
    const queryRunner = this.dataSource.createQueryRunner(); // Create queryRunner from DataSource
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newOrder = new Order();
      const user = await queryRunner.manager.findOneByOrFail(User, {
        id,
      });
      newOrder.user = user;
      const savedOrder = await queryRunner.manager.save(Order, newOrder);
      const total =  0
      for (const item of orders) {
        const product = await queryRunner.manager.findOneByOrFail(Product, {
          id: item.productId,
        });
      
        if (!product) {
          throw new Error(`Product with id ${item.productId} not found`);
        }
        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product: ${product.name}`);
        }
       
        product.stock -= item.quantity;
        await queryRunner.manager.save(Product, product);
  
        
        const orderItem = new OrderItem();
        orderItem.product = product;
        orderItem.quantity = item.quantity;
        orderItem.order = savedOrder;
        await queryRunner.manager.save(OrderItem, orderItem);
      }
      await queryRunner.commitTransaction();
      return {
        id: savedOrder.id,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

  }
}
