import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/common/models/product.entity';
import { User } from 'src/common/models/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  private async seed() {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('password', salt);
    const users = [
      {
        email: 'default@mail.com',
        password:hash,
        name: 'John Doe',
      },
      {
        email: 'jane.smith@example.com',
        password: 'password456',
        name: 'Jane Smith',
      },
    ];

    for (const userData of users) {
      const existingUser = await this.userRepository.findOne({
        where: { email: userData.email },
      });
      if (!existingUser) {
        const user = this.userRepository.create(userData);
        await this.userRepository.save(user);
        console.log(`User ${user.name} created`);
      }
    }

    // Seed Products
    const products = [
      { name: 'Laptop', description: 'High-performance laptop', price: 1200.0 },
      {
        name: 'Smartphone',
        description: 'Latest model smartphone',
        price: 800.0,
      },
    ];

    for (const productData of products) {
      const existingProduct = await this.productRepository.findOne({
        where: { name: productData.name },
      });
      if (!existingProduct) {
        const product = this.productRepository.create(productData);
        await this.productRepository.save(product);
        console.log(`Product ${product.name} created`);
      }
    }
  }
}
