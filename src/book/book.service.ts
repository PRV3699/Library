/* eslint-disable prettier/prettier */
import { Injectable,NotFoundException} from '@nestjs/common';
import { EntryBookDTO } from './dto/entry.book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchBookDTO } from './dto/search.book.dto';
import { UserEntity } from 'src/user/user.entity';
import { BookRepository } from './book.repository';

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

    async getBookById(id: string) {
        // select * from Book where id = {id}
        const book = await this.bookRepository.findOne(id);
        if(!book) {
            throw new NotFoundException('book not found');

        }
        return book;
    }

  

    async deleteBook(id: string) { 
        // deleting the book with id 
        const result = await this.bookRepository.delete(id);

        // if affected rows are > 0 -> successs
        if (result.affected == 0) {
            throw new NotFoundException('book not found');

        }
        return result;
    }

   

   

}
