import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "src/common/models/order.entity";
import { User } from "src/common/models/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}
  async profile(user){
      return this.userRepository.findOne({
        where: {
          id: user.id,
        },
        select: ['name', 'email', 'id'],
      });
  }
  async orders(user){
    return this.orderRepository.find({
      where: {
        user: { id: user.id },
      },
      
    });
}
}
