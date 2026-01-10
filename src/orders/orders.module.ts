import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

import { Order } from './entities/order.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
      TypeOrmModule.forFeature ([ Order,OrderDetail ]) 
    ]
})
export class OrdersModule {}
