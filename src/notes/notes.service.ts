import { Author } from '@/authors/entities/author.entity';
import { Book } from '@/books/entities/book.entity';
import { Reading } from '@/readings/entities/reading.entity';
import { User } from '@/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { QueryNoteDto } from './dto/query-note.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    @InjectRepository(Reading)
    private readingRepository: Repository<Reading>,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const note: Note = new Note();
    note.owner = await this.userRepository.findOneByOrFail({
      id: createNoteDto.ownerId,
    });
    note.ownerId = createNoteDto.ownerId;
    note.content = createNoteDto.content;
    note.author = await this.authorRepository.findOneByOrFail({
      id: createNoteDto.authorId,
    });
    note.authorId = createNoteDto.authorId;
    note.book = await this.bookRepository.findOneByOrFail({
      id: createNoteDto.bookId,
    });
    note.bookId = createNoteDto.bookId;
    note.reading = await this.readingRepository.findOneByOrFail({
      id: createNoteDto.readingId,
    });
    note.readingId = createNoteDto.readingId;
    note.page = createNoteDto?.page;
    return this.noteRepository.save(note);
  }

  findAll(query?: QueryNoteDto): Promise<Note[]> {
    return this.noteRepository.find({ where: query });
  }

  findOne(id: number): Promise<Note | null> {
    return this.noteRepository.findOneBy({ id: id });
  }

  update(id: number, updateNoteDto: UpdateNoteDto): Promise<UpdateResult> {
    return this.noteRepository.update({ id: id }, updateNoteDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.noteRepository.delete({ id: id });
  }
}
