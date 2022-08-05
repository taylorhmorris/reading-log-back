import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { User } from '@/users/entities/user.entity';
import { Language } from '@/languages/entities/language.entity';
import { Author } from '@/authors/entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, User, Author, Language])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
