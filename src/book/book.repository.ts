import { EntityRepository, Repository } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import * as moment from 'moment';
import { BookEntity } from './book.entity';
import { SearchBookDTO } from './dto/search.book.dto';
import { EntryBookDTO } from './dto/entry.book.dto';
import { UserEntity } from 'src/user/user.entity';
import { BookStatus } from './book.status.enum';
import { issuedBookDTO } from './dto/issue.book.dto';

@EntityRepository(BookEntity)
export class BookRepository extends Repository<BookEntity> {
  async getBooks(searchBookDto: SearchBookDTO, user: UserEntity) {
    const { search } = searchBookDto;
    const query = this.createQueryBuilder('book');
    if (search) {
      query.andWhere(
        `(book.title LIKE :search) OR (book.author LIKE :search) OR (book.description LIKE :search)`,

        { search: `%${search}%` },
      );
    }

    // add the user id
    // query.andWhere(`book.userId = userId`, { userId: user.id });

    return await query.getMany();
  }
  async entryBook(entryBookDto: EntryBookDTO, user: UserEntity) {
    const book = new BookEntity();
    book.title = entryBookDto.title;
    book.author = entryBookDto.author;
    book.description = entryBookDto.description;
    book.status = BookStatus.Available;
    // the logged in user own the book
    book.userId = user.id;
    // delete user property
    delete book.user;
    return this.save(book);
  }
  async issuedBook(issuedBookDto: issuedBookDTO, id: number) {
    const book = await this.findOne(id, { relations: ['user'] });
    if (!book) {
      // throw new NotFoundException('book not found');
    }
    if (book.status == BookStatus.Issued) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          message: 'Book is already issued',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    } else {
      book.status = BookStatus.Issued;
      book.userId = issuedBookDto.id;

      book.issuedDate = moment().toISOString();
      book.returnDate = moment().add(15, 'days').toISOString();
      console.log(book.user);
      return this.save(book);
      // return book;
    }
  }
  async returnBook(user: UserEntity, status: BookStatus, id: number) {
    const book = await this.findOne(id);

    if (!book) {
      throw new NotFoundException('book not found');
    }
    if (user.id == 1) {
      if (book.status == BookStatus.Issued) {
        book.status = status;
        // book.userId = null;
        //book.issuedDate = null;
        //book.returnDate = null;
        console.log(book.user);
      } else {
        throw new HttpException(
          {
            status: HttpStatus.NOT_ACCEPTABLE,
            message: 'Book is already available',
          },
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      return this.save(book);
    } else {
      throw new UnauthorizedException('Only admin can return the book');
    }
  }
}
