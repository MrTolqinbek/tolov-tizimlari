import { Module } from '@nestjs/common';
import { SeederService } from "./seeder.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/common/models/product.entity";
import { User } from "src/common/models/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([
    User,
    Product,
  ])],
  providers: [SeederService],
})
export class SeederModule {}
