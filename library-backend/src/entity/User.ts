import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Borrow } from './Borrow';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  identityNumber: string;

  @Column()
  address: string;

  @Column()
  status: string;

  @OneToMany(() => Borrow, borrow => borrow.user)
  borrows: Borrow[];
}
