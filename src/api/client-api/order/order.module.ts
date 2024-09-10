import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/common/models/order.entity';
import { Product } from 'src/common/models/product.entity';
import { User } from 'src/common/models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, User])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
