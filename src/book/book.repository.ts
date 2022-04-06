import { EntityRepository, Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { SearchBookDTO } from './dto/search.book.dto';
import { EntryBookDTO } from './dto/entry.book.dto';
import { UserEntity } from 'src/user/user.entity';

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

    // the logged in user own the book
    book.user = user;

    // delete user property
    delete book.user;

    return this.save(book);
  }
}
