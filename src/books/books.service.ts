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
  ) {}

  create(createBookDto: CreateBookDto): Promise<CreateBookDto & Book> {
    return this.bookRepository.save(createBookDto);
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
