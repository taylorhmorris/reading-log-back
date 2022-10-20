import { PartialType, PickType } from '@nestjs/swagger';
import { OwnedEntity } from '../entities/owned.entity';

export class QueryOwnedDto extends PickType(PartialType(OwnedEntity), [
  'id',
  'ownerId',
  'isPublic',
]) {}
