import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from 'src/common/models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/common/models/transaction.entity';
import { Order } from 'src/common/models/order.entity';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User, Order, Transaction])],
})
export class UserModule {}
