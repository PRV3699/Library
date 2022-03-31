import { EntityRepository, Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { SearchBookDTO } from './dto/search.book.dto';
import { EntryBookDTO } from './dto/entry.book.dto';

@EntityRepository(BookEntity)
export class BookRepository extends Repository<BookEntity> {
  async getBooks(searchBookDto: SearchBookDTO) {
    const { search } = searchBookDto;

    const query = this.createQueryBuilder('book');

    if (search) {
      query.andWhere(
        `(book.title LIKE :search) OR (book.author LIKE :search) OR (book.description LIKE :search)`,

        { search: `%${search}%` },
      );
    }

    return await query.getMany();
  }
  async entryBook(entryBookDto: EntryBookDTO) {
    const book = new BookEntity();

    book.title = entryBookDto.title;

    book.author = entryBookDto.author;

    book.description = entryBookDto.description;

    return await this.save(book);

    
  }
}
