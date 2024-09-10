import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderItemDto {
    @IsNotEmpty()
    @IsNumber()
    productId: number

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}