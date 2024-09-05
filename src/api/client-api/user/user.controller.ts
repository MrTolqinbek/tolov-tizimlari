import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { UserService } from './user.service';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';


@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}


  @Get('profile')
  async profile(@Req() req) {
    return await this.userService.profile(req.user);
  }
  @Get('orders')
  async orders(@Req() req) {
    return await this.userService.orders(req.user);
  }
}
