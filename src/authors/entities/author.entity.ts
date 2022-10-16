import { OwnedEntity } from '@common/entities/owned.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity()
export class Author extends OwnedEntity {
  constructor(src?: Author) {
    super(src);
    if (src) {
      this.firstNames = src.firstNames;
      this.lastName = src.lastName;
    }
  }

  @ApiProperty({
    description: "The Author's first and middle names",
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  firstNames: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "The Author's last name",
  })
  @Column()
  lastName: string;
}
