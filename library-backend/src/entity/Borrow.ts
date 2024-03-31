import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Book } from './Book';
import { Cassette } from './Cassette';
import { DVD } from './DVD';
import { Member } from './Member';

@Entity()
export class Borrow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  borrowDate: Date;

  @Column()
  returnDate: Date;

  @ManyToOne(() => Member, member => member.borrows)
  member: Member;

  @ManyToOne(() => Book, book => book.borrows)
  book: Book;

  @ManyToOne(() => Cassette, cassette => cassette.borrows)
  cassette: Cassette;

  @ManyToOne(() => DVD, dvd => dvd.borrows)
  dvd: DVD;
}