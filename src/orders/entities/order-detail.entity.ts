import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'product_name', length: 150 })
  productName: string;

  @Column('int')
  quantity: number;

  @Column('numeric', { precision: 12, scale: 2, name: 'unit_price' })
  unitPrice: number;

  @ManyToOne(() => Order, (order) => order.details, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
