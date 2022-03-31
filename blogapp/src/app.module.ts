/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';
import { TypeORMConfiguration } from './config/typeorm.config';

@Module({
  imports: [BlogModule,UserModule,TypeOrmModule.forRoot(TypeORMConfiguration)],
  controllers: [],
  providers: [],
})
export class AppModule {}
