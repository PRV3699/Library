/* eslint-disable prettier/prettier */
import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import * as moment from 'moment';
import { BookUserRepository } from '../bookuser/bookuser.repository';
import { BookEntity } from './book.entity';
import { SearchBookDTO } from './dto/search.book.dto';
import { EntryBookDTO } from './dto/entry.book.dto';
import { UserEntity } from 'src/user/user.entity';
import { UpdateBookDTO } from './dto/update.book.dto';
import { BookStatus } from './book.status.enum';
import { IssuedBookDTO } from './dto/issue.book.dto';
import { ReturnBookDTO } from './dto/return.book.dto';
import { BookUserEntity } from '../bookuser/book.user.entity';

@EntityRepository(BookEntity)
export class BookRepository extends Repository<BookEntity> {
  async getBooks(searchBookDto: SearchBookDTO) {
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
  async entryBook(entryBookDto: EntryBookDTO) {
    const book = new BookEntity();
    book.title = entryBookDto.title;
    book.author = entryBookDto.author;
    book.description = entryBookDto.description;
    book.quantity = entryBookDto.quantity;

    return this.save(book);
  }

  validateBookQuantity(quantity: number) {
    if (quantity == 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          message: 'Book is not available',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    return;
  }
  async updateBook(updateBookDto: UpdateBookDTO, id: number) {
    const book = await this.findOne(id);
    const OldData = {
      title: book.title,
      author: book.author,
      description: book.description,
      quantity: book.quantity,
    };
    console.log(OldData);
    const updateData = {
      title: updateBookDto.title,
      author: updateBookDto.author,
      description: updateBookDto.description,
      quantity: updateBookDto.quantity,
    };
    if (updateData.title == null ) {
      updateData.title = OldData.title;
    }
    if (updateData.author == null ) {
      updateData.author = OldData.author;
    }
    if (updateData.description == null ) {
      updateData.description = OldData.description;
    }
    if (updateData.quantity == null ) {
      updateData.quantity = OldData.quantity;
    }
    await this.update(id, updateData);
    return updateData;
  }
  async issuedBook(issuedBookDto: IssuedBookDTO, id: number) {
    const book = await this.findOne(id);
    if (!book) {
      throw new NotFoundException('book not found');
    }
    this.validateBookQuantity(book.quantity);
    const bookUserRepository = getCustomRepository(BookUserRepository);
    const bookuser = await bookUserRepository.issuedBook(issuedBookDto, id);
    book.quantity = book.quantity - 1;
    await this.save(book);
    return bookUserRepository.save(bookuser);
  }
  async returnBook(returnBookDto: ReturnBookDTO, user: UserEntity) {
    const book = await this.findOne(returnBookDto.bookId);
    if (!book) {
      throw new NotFoundException('book not found');
    }
    if (user.id == 1) {
      const bookUserRepository = getCustomRepository(BookUserRepository);
      await bookUserRepository.returnBook(returnBookDto);
      book.quantity = book.quantity + 1;
      return await this.save(book);
    } else {
      throw new UnauthorizedException('Only admin can return the book');
    }
  }
}
