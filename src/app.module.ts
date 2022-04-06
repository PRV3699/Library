import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfiguration } from './config/typeorm.config';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    BookModule,
    UserModule,
    // adding dependency for TypeORM
    TypeOrmModule.forRoot(TypeOrmConfiguration),
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
