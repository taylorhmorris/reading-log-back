import { PickType } from '@nestjs/swagger';
import { AuthorDto } from './author.dto';

export class CreateAuthorDto extends PickType(AuthorDto, [
  'owner',
  'firstNames',
  'lastName',
]) {}
