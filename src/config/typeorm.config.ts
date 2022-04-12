// configuration for DB connectivity

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BookEntity } from '../book/book.entity';
import { UserEntity } from '../user/user.entity';
export const TypeOrmConfiguration: TypeOrmModuleOptions = {
  username: 'root',
  password: '',
  port: 3306,
  host: 'localhost',
  type: 'mysql',
  database: 'library2',
  entities: [BookEntity, UserEntity],

  // true all the properties in the entity classes will be synchronized with database
  synchronize: false,
};
