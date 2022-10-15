import { CaslModule } from '@/casl/casl.module';
import { User } from '@/users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';

describe('BooksController', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          cache: true,
          envFilePath: ['.env.test'],
          isGlobal: true,
        }),
        CaslModule,
      ],
      controllers: [BooksController],
      providers: [
        { provide: BooksService, useValue: jest.fn() },
        { provide: getRepositoryToken(User), useClass: Repository<User> },
        { provide: getRepositoryToken(Book), useClass: Repository<Book> },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
