import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { BookService } from './book.service';

@Module({
  // use typeorm to create the table book using repository
  imports: [TypeOrmModule.forFeature([BookRepository]), UserModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
