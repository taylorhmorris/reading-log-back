import { Author } from '@/authors/entities/author.entity';
import { Book } from '@/books/entities/book.entity';
import { Reading } from '@/readings/entities/reading.entity';
import { User } from '@/users/entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { NotesService } from './notes.service';

describe('NotesService', () => {
  let service: NotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        { provide: getRepositoryToken(Note), useValue: jest.fn() },
        { provide: getRepositoryToken(Book), useValue: jest.fn() },
        { provide: getRepositoryToken(Author), useValue: jest.fn() },
        { provide: getRepositoryToken(Reading), useValue: jest.fn() },
        { provide: getRepositoryToken(User), useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
