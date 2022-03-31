/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeORMConfiguration: TypeOrmModuleOptions = {
  username: 'root',
  password: '',
  port: 3306,
  host: 'localhost',
  type: 'mysql',
  database: 'Blogapp',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: false,
};
