import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { Note } from '../entities/note.entity';

class MandatoryColumns extends PickType(Note, ['ownerId', 'content']) {}

class OptionalColumns extends PartialType(
  PickType(Note, ['authorId', 'bookId', 'readingId', 'page']),
) {}

export class CreateNoteDto extends IntersectionType(
  MandatoryColumns,
  OptionalColumns,
) {}
