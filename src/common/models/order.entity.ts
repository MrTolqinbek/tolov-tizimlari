import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';
import { Transaction } from './transaction.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.orders)
    user: User;

    @ManyToMany(() => Product, product => product.orders)
    @JoinTable()
    products: Product[];

    @OneToOne(() => Transaction, transaction => transaction.order)
    @JoinColumn()
    transaction: Transaction;
}
