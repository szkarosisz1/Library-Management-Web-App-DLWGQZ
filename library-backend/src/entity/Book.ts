import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Borrow } from './Borrow';

export enum Status {
  free = 'Szabad',
  borrowed = 'Kikölcsönzött',
  scrapped = 'Selejtezett'
}

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

  @Column({
    unique: true,
    length: 17
  })
  serialNumber: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.free
  })
  status: string;

  @OneToMany(() => Borrow, borrow => borrow.book)
  borrows: Borrow[];
}