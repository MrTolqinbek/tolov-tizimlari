import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from "./order.service";
import { CreateOrderItemDto } from "./orderDto/order.create.dto";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";

@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  
  @Post('/')
  async placeOrder(
    @Req() req: Request & { user: { id: number } },
    @Body() orders: CreateOrderItemDto[],
  ): Promise<any> {
    return this.orderService.order(req.user.id, orders);
  }
}
