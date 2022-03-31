import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EntryBookDTO } from './dto/entry.book.dto';
import { BookService } from './book.service';

import { SearchBookDTO } from './dto/search.book.dto';
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  entryBook(@Body() entryBookDto: EntryBookDTO) {
    // 1. enter  a new book details
    // 2. return all book details
    return this.bookService.entryBook(entryBookDto);
  }

  @Get()
  getBooks(@Query() searchBookDto: SearchBookDTO) {
    return this.bookService.getBooks(searchBookDto);
  }
   @Delete('/:id')
   deleteBook(@Param('id') id: string) {
       return this.bookService.deleteBook(id);

   }
  // changeStatus {}
}
