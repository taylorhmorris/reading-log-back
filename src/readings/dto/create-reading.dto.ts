import { IntersectionType, PickType } from '@nestjs/swagger';
import { Reading } from '../entities/reading.entity';
import { QueryReadingDto } from './query-reading.dto';

export class CreateReadingDto extends IntersectionType(
  PickType(Reading, ['ownerId', 'bookId', 'startDate']),
  QueryReadingDto,
) {}
