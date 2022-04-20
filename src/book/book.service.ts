/* eslint-disable prettier/prettier */
import { Injectable,NotFoundException,HttpException,HttpStatus } from '@nestjs/common';
import { EntryBookDTO } from './dto/entry.book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchBookDTO } from './dto/search.book.dto';
import { UserEntity } from 'src/user/user.entity';
import { BookRepository } from './book.repository';
import { UpdateBookDTO } from './dto/update.book.dto';
import { IssuedBookDTO } from './dto/issue.book.dto';
import { ReturnBookDTO } from './dto/return.book.dto';
import { BookEntity } from './book.entity';
import { BookStatus } from './book.status.enum';



@Injectable()
export class BookService {
    constructor(@InjectRepository(BookRepository)
    private bookRepository:BookRepository,){}


    // return books 
    getBooks(searchBookDto: SearchBookDTO) {
       return this.bookRepository.getBooks(searchBookDto);
    }
    // enter a new book 
    entryBook(entryBookDto: EntryBookDTO) {
        return this.bookRepository.entryBook(entryBookDto);
    }

    async getBookById(id: number) {
        // select * from Book where id = {id}
        const book = await this.bookRepository.findOne(id);
        if(!book) {
            throw new NotFoundException('book not found');
        }
        return book;
    }
    async deleteBook(id: string) {
        const result = await this.bookRepository.delete(id);
          if (result.affected == 0) {
             throw new NotFoundException('book not found');
            }
        throw new HttpException(
          {
            status: HttpStatus.OK,
            message: 'Book is deleted Successfully',
          },
           HttpStatus.OK,
        );
    }


    async issuedBook(
      issuedBookDto: IssuedBookDTO,
        id: number,
        ) {
        return this.bookRepository.issuedBook(issuedBookDto, id);
      }

    async returnBook(returnBookDto: ReturnBookDTO, user: UserEntity) {
        return this.bookRepository.returnBook(returnBookDto, user);
      }
      
    
    async updateBook(
      updateBookDto: UpdateBookDTO,
      id: number,
      ):
       Promise<UpdateBookDTO> {
         return this.bookRepository.updateBook(updateBookDto,id);
        }
}

