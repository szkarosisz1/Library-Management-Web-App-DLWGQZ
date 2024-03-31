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
  acquisitionDate: Date; //Beszerzés dátuma

  @Column()
  serialNumber: string;

  @Column()
  status: string;

  @OneToMany(() => Borrow, borrow => borrow.book)
  borrows: Borrow;
}