import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Borrow } from './Borrow';

export enum Status {
  free = 'Szabad',
  borrowed = 'Kikölcsönzött',
  scrapped = 'Selejtezett'
}

@Entity()
export class Cassette {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  title: string;

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

  @OneToMany(() => Borrow, borrow => borrow.cassette)
  borrows: Borrow[];
}