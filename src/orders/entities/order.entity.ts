import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { OrderDetail } from './order-detail.entity';

export enum OrderStatus {
  CREATED = 'creada',
  PAID = 'pagada',
  REJECTED = 'rechazada',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column('numeric', { precision: 12, scale: 2 })
  total: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.CREATED,
  })
  status: OrderStatus;

  @ManyToOne(() => Client, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @OneToMany(() => OrderDetail, (detail) => detail.order, {
    cascade: true,
  })
  details: OrderDetail[];
}
