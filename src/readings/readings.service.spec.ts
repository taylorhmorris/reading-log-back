import { Book } from '@/books/entities/book.entity';
import { User } from '@/users/entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reading } from './entities/reading.entity';
import { ReadingsService } from './readings.service';

describe('ReadingsService', () => {
  let service: ReadingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReadingsService,
        { provide: getRepositoryToken(Reading), useValue: jest.fn() },
        { provide: getRepositoryToken(Book), useValue: jest.fn() },
        { provide: getRepositoryToken(User), useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<ReadingsService>(ReadingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
