import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { BookStatus } from './book.status.enum';
@Entity('Book')
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  issuedDate: string;

  @Column()
  returnDate: string;

  @Column()
  description: string;

  @Column()
  status: BookStatus;

  @Column()
  userId: number;

  @ManyToOne((type) => UserEntity, (user) => user.books, { eager: false })
  user: UserEntity;
}
