/* eslint-disable prettier/prettier */
import { Injectable,NotFoundException,HttpException,HttpStatus } from '@nestjs/common';
import { EntryBookDTO } from './dto/entry.book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchBookDTO } from './dto/search.book.dto';
import { UserEntity } from 'src/user/user.entity';
import { BookRepository } from './book.repository';
import { UpdateBookDTO } from './dto/update.book.dto';
import { issuedBookDTO } from './dto/issue.book.dto';
import { BookEntity } from './book.entity';
import { BookStatus } from './book.status.enum';



@Injectable()
export class BookService {
    constructor(@InjectRepository(BookRepository)
    private bookRepository:BookRepository,){}


    // return books 
    getBooks(searchBookDto: SearchBookDTO, user: UserEntity) {
       return this.bookRepository.getBooks(searchBookDto, user);
    }
    // enter a new book 
    entryBook(entryBookDto: EntryBookDTO, user: UserEntity) {
        return this.bookRepository.entryBook(entryBookDto, user);
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
      issuedBookDto: issuedBookDTO,
        id: number,
        
      ): Promise<BookEntity> {
        return this.bookRepository.issuedBook(issuedBookDto, id);
      }

      async returnBook(

        
    
        id: number,
    
        user: UserEntity,
    
        status: BookStatus,
    
      ): Promise<BookEntity> {
    
        return this.bookRepository.returnBook( user, status, id);
    
      }

     async updateBook(
        updateBookDto: UpdateBookDTO,
          id: number,
        )
        {
            const book=await this.getBookById(id)
             const OldData = {
            title: book.title,
            author: book.author,
            description: book.description,
        };

        const updateData = {
          title: updateBookDto.title,
          author: updateBookDto.author,
          description: updateBookDto.description,
        };
        if(updateData.title !== undefined){
            updateData.title=OldData.title
        }
        if(updateData.author  !== undefined){
            updateData.author==OldData.author
        }
        if(updateData.description  !== undefined){
            updateData.description==OldData.description
        }
        await this.bookRepository.update(id, updateData);
        return  updateData;
    }
}

