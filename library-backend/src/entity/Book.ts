import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Borrow } from './Borrow';

export enum Status {
  free = 'szabad',
  borrowed = 'kikölcsönzött',
  scrapped = 'selejtezett',
  other = 'egyéb'
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
  acquisitionDate: Date; //Beszerzés dátuma

  @Column({
    unique: true,
    length: 13
  })
  serialNumber: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.other
  })
  status: string;

  @OneToMany(() => Borrow, borrow => borrow.book)
  borrows: Borrow[];
}