import { PickType } from '@nestjs/swagger';
import { Author } from '../entities/author.entity';

export class CreateAuthorDto extends PickType(Author, [
  'owner',
  'firstNames',
  'lastName',
]) {}
