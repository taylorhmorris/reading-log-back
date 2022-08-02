import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: "The User's id",
  })
  @IsPositive()
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'A unique username',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'A unique email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "The user's password",
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
