import { Author } from '@/authors/entities/author.entity';
import { Language } from '@/languages/entities/language.entity';
import { User } from '@/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book: Book = new Book();
    book.title = createBookDto.title;
    book.length = createBookDto.length;
    book.edition = createBookDto.edition;
    book.publicationDate = createBookDto.publicationDate;
    book.owner = await this.userRepository.findOneByOrFail({
      id: createBookDto.ownerId,
    });
    book.ownerId = createBookDto.ownerId;
    book.language = await this.languageRepository.findOneByOrFail({
      id: createBookDto.languageId,
    });
    book.author = await this.authorRepository.findOneByOrFail({
      id: createBookDto.authorId,
    });
    return this.bookRepository.save(book);
  }

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  findOne(id: number): Promise<Book | null> {
    return this.bookRepository.findOneBy({ id: id });
  }

  update(id: number, updateBookDto: UpdateBookDto): Promise<UpdateResult> {
    return this.bookRepository.update({ id: id }, updateBookDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.bookRepository.delete({ id: id });
  }
}
