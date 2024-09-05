import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  amount: number;

  @Column()
  paymentMethod: string;

  @Column()
  status: string;

  @OneToOne(() => Order, (order) => order.transaction, { nullable: true })
  order?: Order;
}
