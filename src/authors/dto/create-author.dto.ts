import { PickType } from '@nestjs/swagger';
import { Author } from '../entities/author.entity';

export class CreateAuthorDto extends PickType(Author, [
  'ownerId',
  'firstNames',
  'lastName',
]) {}
