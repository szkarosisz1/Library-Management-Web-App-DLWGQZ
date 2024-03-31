import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Borrow } from './Borrow';

@Entity()
export class Cassette {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  title: string;

  @Column()
  acquisitionDate: Date; //Beszerzés dátuma

  @Column()
  serialNumber: string;

  @Column()
  status: string;

  @OneToMany(() => Borrow, borrow => borrow.cassette)
  borrows: Borrow[];
}