import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './common/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './common/models/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from './common/config/config.service';
import { Order } from './common/models/order.entity';
import { Product } from './common/models/product.entity';
import { Transaction } from './common/models/transaction.entity';
import { ClientApiModule } from "./api/client-api/client-api.module";
import { SeederModule } from "./api/service/seed/seeder.module";
import { OrderItem } from "./common/models/orderItem.entity";
@Module({
  imports: [
    ClientApiModule,
    ConfigModule,
    SeederModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        const db = configService.databaseConfig;
        return {
          type: db.provider as
            | 'mysql'
            | 'postgres'
            | 'sqlite'
            | 'mariadb'
            | 'oracle'
            | 'mongodb',
          host: db.host,
          port: db.port,
          username: db.username,
          password: db.password,
          database: db.database,
          entities: [User, Order, Product, Transaction, OrderItem],
          synchronize: true,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
