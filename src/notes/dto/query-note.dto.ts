import { PickType, PartialType } from '@nestjs/swagger';
import { Note } from '../entities/note.entity';

export class QueryNoteDto extends PickType(PartialType(Note), [
  'id',
  'owner',
  'ownerId',
  'createdAt',
  'updatedAt',
  'author',
  'authorId',
  'book',
  'bookId',
  'reading',
  'readingId',
  'page',
  'content',
]) {}
