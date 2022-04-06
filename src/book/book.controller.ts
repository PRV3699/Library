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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get.user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { EntryBookDTO } from './dto/entry.book.dto';
import { BookService } from './book.service';
import { SearchBookDTO } from './dto/search.book.dto';

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
    return this.bookService.entryBook(entryBookDto, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  getBooks(@GetUser() user: UserEntity, @Query() searchBookDto: SearchBookDTO) {
    return this.bookService.getBooks(searchBookDto, user);
  }
  @Delete('/:id')
  deleteBook(@GetUser() user: UserEntity, @Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }
}
