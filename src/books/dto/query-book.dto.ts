import { PartialType, PickType } from '@nestjs/swagger';
import { Book } from '../entities/book.entity';

export class QueryBookDto extends PickType(PartialType(Book), [
  'id',
  'ownerId',
  'isPublic',
  'createdAt',
  'updatedAt',
  'title',
  'author',
  'authorId',
  'edition',
  'language',
  'languageId',
  'length',
  'publicationDate',
]) {}
