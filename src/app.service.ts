import { Injectable } from '@nestjs/common';
import { ConfigService } from "./common/config/config.service";

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {
  
  }
  getHello(): string {
    return 'Hello World!';
  }
}
