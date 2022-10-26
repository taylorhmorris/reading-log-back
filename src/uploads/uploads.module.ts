import { AuthorsModule } from '@/authors/authors.module';
import { BooksModule } from '@/books/books.module';
import { LanguagesModule } from '@/languages/languages.module';
import { NotesModule } from '@/notes/notes.module';
import { ReadingsModule } from '@/readings/readings.module';
import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';

@Module({
  imports: [
    AuthorsModule,
    BooksModule,
    ReadingsModule,
    NotesModule,
    LanguagesModule,
  ],
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
