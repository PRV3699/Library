/* eslint-disable prettier/prettier */
import { Injectable,NotFoundException} from '@nestjs/common';
import { EntryBookDTO } from './dto/entry.book.dto';
import { Book  } from './book.model';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchBookDTO } from './dto/search.book.dto';

import { BookRepository } from './book.repository';

@Injectable()
export class BookService {
    constructor(@InjectRepository(BookRepository)
    private bookRepository:BookRepository,){}

    // store all the books
    private books: Book[] = [];

    // return books 
    getBooks(searchBookDto: SearchBookDTO) {
       return this.bookRepository.getBooks(searchBookDto);
    }

    entryBook(entryBookDto: EntryBookDTO) {
        return this.bookRepository.entryBook(entryBookDto);
        
      
    }

    private getBookById(id: string) {

        const book = this.books.find((book) =>{
            return book.id == id;

        });

        // if book with the is is not found 
        if (!book) {
            throw new NotFoundException('book not found');

        }
        return book;
    }

    deleteBook(id: string) {
       // check if the book existes
       this.getBookById(id);

       // delete the book matching id
       // select all of those books which are not having id matching to the book
       this.books = this.books.filter((book) => book.id != id);

       return this.books;
    }

   

   

}
