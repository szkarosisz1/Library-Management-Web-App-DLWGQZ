import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Borrow } from './Borrow';

export enum Status {
  free = 'szabad',
  borrowed = 'kikölcsönzött',
  scrapped = 'selejtezett',
  other = 'egyéb'
}

@Entity()
export class DVD {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  title: string;

  @Column()
  acquisitionDate: Date; //Beszerzés dátuma

  @Column({
    unique: true,
    length: 17
  })
  serialNumber: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.other
  })
  status: string;

  @OneToMany(() => Borrow, borrow => borrow.dvd)
  borrows: Borrow[];
}