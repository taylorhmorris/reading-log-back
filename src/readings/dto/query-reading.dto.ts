import { PartialType, PickType } from '@nestjs/swagger';
import { Reading } from '../entities/reading.entity';

export class QueryReadingDto extends PickType(PartialType(Reading), [
  'id',
  'ownerId',
  'isPublic',
  'createdAt',
  'updatedAt',
  'book',
  'bookId',
  'startDate',
  'endDate',
]) {}
