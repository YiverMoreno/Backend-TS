import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderDetailDto } from './create-order-detail.dto';
import { OrderStatus } from '../entities/order.entity';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  clientId: string;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetailDto)
  details: CreateOrderDetailDto[];
}
