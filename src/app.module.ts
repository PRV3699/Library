import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfiguration } from './config/typeorm.config';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { BookUserEntity } from './bookuser/book.user.entity';
import { ReminderModule } from './remainder/remainder.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    BookModule,
    UserModule,
    BookUserEntity,
    ReminderModule,
    // adding dependency for TypeORM
    TypeOrmModule.forRoot(TypeOrmConfiguration),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
