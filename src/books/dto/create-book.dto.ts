import { PickType } from '@nestjs/swagger';
import { Book } from '../entities/book.entity';

export class CreateBookDto extends PickType(Book, [
  'owner',
  'authorId',
  'title',
  'languageId',
  'length',
  'publicationDate',
  'edition',
]) {}
