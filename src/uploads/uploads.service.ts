import { AuthorsService } from '@/authors/authors.service';
import { CreateAuthorDto } from '@/authors/dto/create-author.dto';
import { BooksService } from '@/books/books.service';
import { CreateBookDto } from '@/books/dto/create-book.dto';
import { AuthUserToken } from '@/common/dto/auth-user-payload.dto';
import { CreateLanguageDto } from '@/languages/dto/create-language.dto';
import { LanguagesService } from '@/languages/languages.service';
import { NotesService } from '@/notes/notes.service';
import { CreateReadingDto } from '@/readings/dto/create-reading.dto';
import { ReadingsService } from '@/readings/readings.service';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotImplementedException,
} from '@nestjs/common';

@Injectable()
export class UploadsService {
  private readonly logger = new Logger(UploadsService.name);

  constructor(
    private readonly authorsService: AuthorsService,
    private readonly booksService: BooksService,
    private readonly readingsService: ReadingsService,
    private readonly notesService: NotesService,
    private readonly languagesService: LanguagesService,
  ) {}

  async createAuthors(
    user: AuthUserToken,
    authors: Array<any>,
  ): Promise<Map<number, number>> {
    const authorRemapping = new Map();
    for (const author of authors) {
      const authorDto: CreateAuthorDto = {
        ownerId: user.userId,
        firstNames: author.first_names,
        lastName: author.last_names,
      };
      console.log(author);
      const newAuthor = await this.authorsService.create(authorDto);
      const newId = newAuthor.id;
      authorRemapping.set(author.id, newId);
    }
    return authorRemapping;
  }

  async createLanguages(
    user: AuthUserToken,
    languages: Array<string>,
  ): Promise<Map<string, number>> {
    const languagesRemapping = new Map();
    for (const language of languages) {
      const languageDto: CreateLanguageDto = {
        ownerId: user.userId,
        name: language,
      };
      console.log(language);
      const newLanguage = await this.languagesService.create(languageDto);
      const newId = newLanguage.id;
      languagesRemapping.set(language, newId);
    }
    return languagesRemapping;
  }

  async createBooks(
    user: AuthUserToken,
    books: Array<any>,
    authorMap: Map<number, number>,
    languageMap: Map<string, number>,
  ): Promise<Map<number, number>> {
    const bookRemapping = new Map();
    for (const book of books) {
      const authorId = authorMap.get(book.author_id);
      const languageId = languageMap.get(book.language);
      if (!authorId || !languageId) {
        throw new BadRequestException(
          'Invalid Json File. Some Entries Could Not Be Created',
        );
        continue;
      }
      const bookDto: CreateBookDto = {
        ownerId: user.userId,
        title: book.title,
        authorId: authorId,
        languageId: languageId,
        length: book.length,
        edition: book.edition,
        publicationDate: book.pub_year,
      };
      console.log(book);
      const newBook = await this.booksService.create(bookDto);
      const newId = newBook.id;
      bookRemapping.set(book.id, newId);
    }
    return bookRemapping;
  }

  async createReadings(
    user: AuthUserToken,
    readings: Array<any>,
    bookMap: Map<number, number>,
  ): Promise<Map<number, number>> {
    const readingsRemapping = new Map();
    for (const reading of readings) {
      const bookId = bookMap.get(reading.book_id);
      if (!bookId) {
        throw new BadRequestException(
          'Invalid Json File. Some Entries Could Not Be Created',
        );
        continue;
      }
      const readingDto: CreateReadingDto = {
        ownerId: user.userId,
        bookId: bookId,
        pagesRead: reading.pages_read,
        startDate: reading.start_date,
        endDate: reading.end_date,
      };
      console.log(reading);
      const newBook = await this.readingsService.create(readingDto);
      const newId = newBook.id;
      readingsRemapping.set(reading.id, newId);
    }
    return readingsRemapping;
  }

  async parseJSON(user: AuthUserToken, raw: any): Promise<boolean> {
    if (raw?.version != 1) {
      throw new BadRequestException('Format must be version 1');
    }
    this.logger.log('Parsing:');
    this.logger.debug(raw);

    const authorRemapping = await this.createAuthors(user, raw.data.authors);
    this.logger.log(authorRemapping);
    const languageRemapping = await this.createLanguages(
      user,
      raw.data.languages,
    );
    this.logger.log(languageRemapping);
    const bookRemapping = await this.createBooks(
      user,
      raw.data.books,
      authorRemapping,
      languageRemapping,
    );
    this.logger.log(bookRemapping);
    const readingRemapping = await this.createReadings(
      user,
      raw.data.readings,
      bookRemapping,
    );
    this.logger.log(readingRemapping);
    return true;
  }
}
