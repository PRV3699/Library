/* eslint-disable prettier/prettier */
import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get.user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { EntryBookDTO } from './dto/entry.book.dto';
import { BookService } from './book.service';
import { SearchBookDTO } from './dto/search.book.dto';
import { UpdateBookDTO } from './dto/update.book.dto';
import { BookEntity } from './book.entity';
import { IssuedBookDTO } from './dto/issue.book.dto';
import { ReturnBookDTO } from './dto/return.book.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('book')
@UseGuards(AuthGuard())
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  entryBook(
    @GetUser() user: UserEntity,

    @Body() entryBookDto: EntryBookDTO,
  ) {
    // 1. enter  a new book details
    // 2. return all book details
    return this.bookService.entryBook(entryBookDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  getBooks(@GetUser() user: UserEntity, @Query() searchBookDto: SearchBookDTO) {
    return this.bookService.getBooks(searchBookDto);
  }
  @Delete('/:id')
  deleteBook(@GetUser() user: UserEntity, @Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }

  @Put('/:id')
  updateBook(
    //@GetUser() user: UserEntity,
    @Body() updateBookDto: UpdateBookDTO,
    @Param('id') id: number
  ) {
    return this.bookService.updateBook(updateBookDto, id);
  }

  @Patch()
  issuedBook(
    @GetUser() user: UserEntity,
   

    @Body() issuedBookDto: IssuedBookDTO,
  ) {
    return this.bookService.issuedBook(issuedBookDto);
  }

  @Delete()
  returnBook(
    @GetUser() user: UserEntity,

    @Body() returnBookDto: ReturnBookDTO,
  ) {
    return this.bookService.returnBook(returnBookDto, user);
  }
}
