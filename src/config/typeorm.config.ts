// configuration for DB connectivity

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BookUserEntity } from '../bookuser/book.user.entity';
import { BookEntity } from '../book/book.entity';
import { UserEntity } from '../user/user.entity';
export const TypeOrmConfiguration: TypeOrmModuleOptions = {
  username: 'root',
  password: '',
  port: 3306,
  host: 'localhost',
  type: 'mysql',
  database: 'Library',
  entities: [BookEntity, UserEntity, BookUserEntity],

  // true all the properties in the entity classes will be synchronized with database
  synchronize: false,
};
