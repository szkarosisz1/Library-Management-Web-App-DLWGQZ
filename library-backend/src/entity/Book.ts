import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Borrow } from './Borrow';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  acquisitionDate: Date;

  @Column()
  serialNumber: string;

  @Column()
  status: string; // lehet 'szabad', 'kikölcsönzött', 'selejtezett'

  @OneToMany(() => Borrow, borrow => borrow.book)
  borrows: Borrow[];
}