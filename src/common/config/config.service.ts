import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService extends NestConfigService {
  constructor() {
    super();
  }
  get jwtConfig() {
    return {
      secret: this.get<string>('JWT_SECRET'),
      expiresIn: this.get<string>('JWT_EXPIRES_IN'),
    };
  }
  get paymeConfig() {
    const paymeLogin = this.get<string>('PAYME_LOGIN');
    const paymePassword = this.get<string>('PAYME_PASSWORD');
    const paymeTestUrl = this.get<string>('PAYME_TEST_URL');
    const paymeUrl = this.get<string>('PAYME_URL');
    const paymePasswordTest = this.get<string>('PAYME_PASSWORD_TEST');
    const paymeTestLogin = this.get<string>('PAYME_TEST_LOGIN');

    return {
      paymeLogin,
      paymePassword,
      paymeTestUrl,
      paymeUrl,
      paymePasswordTest,
      paymeTestLogin,
    };
  }
  get databaseConfig() {
    const host = this.get<string>('DATABASE_HOST');
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
      provider,
    };
  }
}
