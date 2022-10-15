import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import { Book } from '@/books/entities/book.entity';
import { Author } from '@/authors/entities/author.entity';
import { Reading } from '@/readings/entities/reading.entity';
import { Note } from './entities/note.entity';
import { CaslModule } from '@/casl/casl.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Note, User, Book, Author, Reading]),
    CaslModule,
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
