import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { User } from '@/users/entities/user.entity';

export class OwnedDto {
  @ApiProperty({
    description: "The Entity's id",
  })
  @IsPositive()
  @IsInt()
  id: number;

  @ApiProperty({
    description: "The Entity's owner",
  })
  @IsNotEmpty()
  owner: User;
}
