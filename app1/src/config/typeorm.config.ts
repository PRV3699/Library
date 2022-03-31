// configuration for DB connectivity

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BookEntity } from '../book/book.entity';
export const TypeOrmConfiguration: TypeOrmModuleOptions = {
    username: 'root',
    password: '',
    port: 3306,
    host: 'localhost',
    type: 'mysql',
    database: 'Library',
    entities: [BookEntity],
    
    // true all the properties in the entity classes will be synchronized with database
    synchronize: true,

};