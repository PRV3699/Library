import { EntityRepository, Repository } from 'typeorm';
import * as moment from 'moment';
import { BookEntity } from './book.entity';
import { SearchBookDTO } from './dto/search.book.dto';
import { EntryBookDTO } from './dto/entry.book.dto';
import { UserEntity } from 'src/user/user.entity';
import { BookStatus } from './book.status.enum';
import { issuedBookDTO } from './dto/issue.book.dto';

@EntityRepository(BookEntity)
export class BookRepository extends Repository<BookEntity> {
  async getBooks(searchBookDto: SearchBookDTO, user: UserEntity) {
    const { search } = searchBookDto;
    const query = this.createQueryBuilder('book');
    if (search) {
      query.andWhere(
        `(book.title LIKE :search) OR (book.author LIKE :search) OR (book.description LIKE :search)`,

        { search: `%${search}%` },
      );
    }

    // add the user id
    // query.andWhere(`book.userId = userId`, { userId: user.id });

    return await query.getMany();
  }
  async entryBook(entryBookDto: EntryBookDTO, user: UserEntity) {
    const book = new BookEntity();
    book.title = entryBookDto.title;
    book.author = entryBookDto.author;
    book.description = entryBookDto.description;
    book.status = BookStatus.Available;
    // the logged in user own the book
    book.user = user;
    // delete user property
    delete book.user;
    return this.save(book);
  }
  async issuedBook(issuedBookDto: issuedBookDTO, id: number) {
    const book = await this.findOne(id, { relations: ['user'] });
    if (!book) {
     // throw new NotFoundException('book not found');
    }
    book.status = BookStatus.Issued;
    book.user.id = issuedBookDto.id;

    book.issuedDate = moment().format('LLL');
    book.returnDate = moment().add(15, 'days').calendar();
    console.log(book.user);
    await this.save(book);
    return book;
  }
}
