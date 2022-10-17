import { PickType, PartialType } from '@nestjs/swagger';
import { Language } from '../entities/language.entity';

export class QueryLanguageDto extends PickType(PartialType(Language), [
  'id',
  'ownerId',
  'isPublic',
  'createdAt',
  'updatedAt',
  'name',
]) {}
