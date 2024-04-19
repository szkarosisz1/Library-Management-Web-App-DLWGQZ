import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Borrow } from './Borrow';

export enum StatusMember {
  active = 'Aktív',
  inactive = 'Passzív'
}

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
  idCardNumber: string;

  @Column()
  address: string;

  @Column({
    type: 'enum',
    enum: StatusMember,
    default: StatusMember.active
  })
  status: string;

  @OneToMany(() => Borrow, borrow => borrow.member)
  borrows: Borrow[];
}