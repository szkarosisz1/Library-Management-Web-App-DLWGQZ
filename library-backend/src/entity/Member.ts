import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Borrow } from './Borrow';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
    length: 11
  })
  phoneNumber: string;

  @Column({
    unique: true,
    length: 8
  })
  identityNumber: string; //személyigazolvány

  @Column()
  address: string;

  @Column()
  status: string;

  @OneToMany(() => Borrow, borrow => borrow.member)
  borrows: Borrow;
}