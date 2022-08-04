import { Author } from '@/authors/entities/author.entity';
import { Language } from '@/languages/entities/language.entity';
import { User } from '@/users/entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: getRepositoryToken(Book), useValue: jest.fn() },
        { provide: getRepositoryToken(Author), useValue: jest.fn() },
        { provide: getRepositoryToken(Language), useValue: jest.fn() },
        { provide: getRepositoryToken(User), useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
