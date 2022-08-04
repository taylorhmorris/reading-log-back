import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';
import { User } from '../entities/user.entity';

export class CreateUserDto extends PickType(User, ['username', 'email']) {
  @ApiProperty({
    description: "The user's password",
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  password: string;
}
