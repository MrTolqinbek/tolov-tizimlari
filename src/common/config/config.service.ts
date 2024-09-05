import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService extends NestConfigService {
  constructor() {
    super();
  }
  getDatabaseConfig() {
    const host = this.get<string>('DATABASE_HOST') ;
    const port = this.get<number>('DATABASE_PORT');
    const username = this.get<string>('DATABASE_USERNAME');
    const password = this.get<string>('DATABASE_PASSWORD');
    const database = this.get<string>('DATABASE_NAME');
    const provider = this.get<string>('DATABASE_PROVIDER');
    return {
      host,
      port,
      username,
      password,
      database,
      provider
    };
  }
}
