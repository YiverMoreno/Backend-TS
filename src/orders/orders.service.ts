import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { Client } from '../client/entities/client.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
   

    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    return this.dataSource.transaction(async (manager) => {
      // 1. Validar cliente
      const client = await manager.findOne(Client, {
        where: { id: dto.clientId },
      });

      if (!client) {
        throw new NotFoundException('Cliente no existe');
      }

      if (!dto.details || dto.details.length === 0) {
        throw new BadRequestException('La orden debe tener al menos un detalle');
      }

      // 2. Calcular total
      const total = dto.details.reduce((acc, detail) => {
        return acc + detail.quantity * Number(detail.unitPrice);
      }, 0);

      // 3. Construir detalles
      const orderDetails = dto.details.map((detail) => {
        const orderDetail = new OrderDetail();
        orderDetail.productName = detail.productName;
        orderDetail.quantity = detail.quantity;
        orderDetail.unitPrice = detail.unitPrice;
        return orderDetail;
      });

      // 4. Construir orden
      const order = new Order();
      order.client = client;
      order.status = dto.status;
      order.total = total;
      order.details = orderDetails;

      // 5. Persistir (cascade maneja detalles)
      return manager.save(Order, order);
    });
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: {
        client: true,
        details: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  } 


  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        client: true,
        details: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Orden no encontrada');
    }

    return order;
  }


  async updateStatus(
    orderId: string,
    dto: UpdateOrderStatusDto,
  ) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Orden no encontrada');
    }

    order.status = dto.status;

    return this.orderRepository.save(order);
  }

  
  async remove(orderId: string): Promise<void> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Orden no encontrada');
    }

    await this.orderRepository.remove(order);
  }

}
