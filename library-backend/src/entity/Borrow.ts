import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Book } from './Book';
import { Cassette } from './Cassette';
import { DVD } from './DVD';

@Entity()
export class Borrow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  borrowDate: Date;

  @Column()
  returnDate: Date;

  @ManyToOne(() => User, user => user.borrows)
  user: User;

  @ManyToOne(() => Book, book => book.borrows)
  book: Book;

  @ManyToOne(() => Cassette, cassette => cassette.borrows)
  cassette: Cassette;

  @ManyToOne(() => DVD, dvd => dvd.borrows)
  dvd: DVD;
}