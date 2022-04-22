import { Module } from '@nestjs/common';
import { BookModule } from 'src/book/book.module';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from '../user/user.repository';
import { BookRepository } from '../book/book.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReminderService } from './remainder.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, BookRepository])],
  controllers: [],
  providers: [ReminderService],
})
export class ReminderModule {}
