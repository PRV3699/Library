import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BookStatus } from './book.status.enum';
import { BookUserEntity } from '../bookuser/book.user.entity';

@Entity('Book')
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  description: string;

  @Column()
  status: BookStatus;

  @OneToMany(() => BookUserEntity, (bookUser) => bookUser.book, {
    eager: false,
  })
  bookUsers: BookUserEntity[];
}
