import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OwnedDto } from '@common/dtos/owned.dto';

export class AuthorDto extends OwnedDto {
  @ApiProperty({
    description: "The Author's first and middle names",
  })
  @IsString()
  @IsNotEmpty()
  firstNames: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "The Author's last name",
  })
  lastName: string;
}
