import { User } from '@/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import {
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

export class OwnedEntity {
  @ApiProperty({
    description: "The Entity's id",
  })
  @IsPositive()
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "The Entity's owner",
  })
  @IsNotEmpty()
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  owner: User;

  @ApiProperty({
    description: 'The id of the owner (User)',
  })
  @IsInt()
  @IsPositive()
  @RelationId((owned: OwnedEntity) => owned.owner)
  ownerId: number;

  @ApiProperty({
    description: 'Creation Date',
  })
  @IsDate()
  @CreateDateColumn()
  createAt: Date;

  @ApiProperty({
    description: 'Last Update Date',
  })
  @IsDate()
  @UpdateDateColumn()
  updatedAt: Date;
}
