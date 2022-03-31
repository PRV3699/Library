import {  Column,Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
