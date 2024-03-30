import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Borrow } from './Borrow';

@Entity()
export class Cassette {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  acquisitionDate: Date;

  @Column()
  serialNumber: string;

  @Column()
  status: string; // lehet 'szabad', 'kikölcsönzött', 'selejtezett'

  @OneToMany(() => Borrow, borrow => borrow.cassette)
  borrows: Borrow[];
}