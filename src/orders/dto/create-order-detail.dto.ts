import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class CreateOrderDetailDto {
  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsNumber()
  @IsPositive()
  unitPrice: number;
}
