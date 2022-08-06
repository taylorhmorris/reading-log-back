import { PickType, PartialType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class QueryUserDto extends PickType(PartialType(User), [
  'id',
  'username',
  'email',
]) {}
