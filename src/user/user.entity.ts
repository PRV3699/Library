import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import * as crypto from 'crypto-js';
import { BookEntity } from 'src/book/book.entity';
import { BookUserEntity } from 'src/bookuser/book.user.entity';
@Entity('User')
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => BookUserEntity, (bookUser) => bookUser.user, { eager: true })
  bookUsers: BookUserEntity[];

  validatePassword(password: string) {
    const encrypted = `${crypto.MD5(password)}`;
    console.log(`encrypted: ${encrypted}, user: ${this.password}`);
    return encrypted == this.password;
  }
}
