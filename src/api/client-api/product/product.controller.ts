import { Controller, Get } from '@nestjs/common';
import { ProductService } from "./product.service";

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}


    @Get('all')
    async all() {
      return await this.productService.getProducts();
    }
  
}
