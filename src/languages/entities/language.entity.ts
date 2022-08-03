import { OwnedEntity } from '@/common/entities/owned.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity()
export class Language extends OwnedEntity {
  @ApiProperty({
    description: 'Display Name',
  })
  @IsString()
  @IsNotEmpty()
  @Column({ nullable: false })
  name: string;
}
