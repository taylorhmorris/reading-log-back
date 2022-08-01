import { PartialType, PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PickType(PartialType(CreateUserDto), [
  'username',
  'password',
]) {}
