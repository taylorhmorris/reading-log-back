import { PartialType, PickType } from '@nestjs/swagger';
import { Author } from '../entities/author.entity';

export class QueryAuthorDto extends PickType(PartialType(Author), [
  'id',
  'ownerId',
  'isPublic',
  'createdAt',
  'updatedAt',
  'firstNames',
  'lastName',
]) {}
