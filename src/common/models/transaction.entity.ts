import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { PaymentStatuses } from "../constants/payment.status.enum";
import { paymentMethods } from "../constants/payment.method.enum";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: PaymentStatuses,
    default: PaymentStatuses.PENDING,
  })
  status: PaymentStatuses;

  @Column({
    type: 'enum',
    enum: paymentMethods,
  })
  paymentMethod: paymentMethods; 
}
