import { Book } from '@/books/entities/book.entity';
import { User } from '@/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateReadingDto } from './dto/create-reading.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';
import { Reading } from './entities/reading.entity';

@Injectable()
export class ReadingsService {
  constructor(
    @InjectRepository(Reading)
    private readingRepository: Repository<Reading>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(createReadingDto: CreateReadingDto): Promise<Reading> {
    const reading: Reading = new Reading();
    reading.startDate = createReadingDto.startDate;
    reading.endDate = createReadingDto.endDate;
    reading.pagesRead = createReadingDto.pagesRead
      ? createReadingDto.pagesRead
      : 0;
    reading.ownerId = createReadingDto.ownerId;
    reading.owner = await this.userRepository.findOneByOrFail({
      id: createReadingDto.ownerId,
    });
    reading.bookId = createReadingDto.bookId;
    reading.book = await this.bookRepository.findOneByOrFail({
      id: createReadingDto.bookId,
    });
    return this.readingRepository.save(reading);
  }

  findAll(query?: FindManyOptions<Reading>): Promise<Reading[]> {
    return this.readingRepository.find(query);
  }

  findOne(id: number): Promise<Reading | null> {
    return this.readingRepository.findOneByOrFail({ id: id });
  }

  update(id: number, updateReadingDto: UpdateReadingDto) {
    return this.readingRepository.update({ id: id }, updateReadingDto);
  }

  remove(id: number) {
    return this.readingRepository.delete({ id: id });
  }
}
