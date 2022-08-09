import { PickType, PartialType } from '@nestjs/swagger';
import { Note } from '../entities/note.entity';

export class QueryNoteDto extends PickType(PartialType(Note), [
  'id',
  'author',
  'authorId',
  'book',
  'bookId',
  'reading',
  'readingId',
  'page',
  'content',
  'owner',
  'ownerId',
]) {}
