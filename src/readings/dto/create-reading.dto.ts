import { PickType } from '@nestjs/swagger';
import { Reading } from '../entities/reading.entity';

export class CreateReadingDto extends PickType(Reading, [
  'ownerId',
  'bookId',
  'startDate',
]) {}
