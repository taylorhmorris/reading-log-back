import { User } from '@/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsPositive,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

export class OwnedEntity {
  constructor(src?: OwnedEntity) {
    if (src) {
      this.ownerId = src.ownerId;
      this.isPublic = src.isPublic;
    }
  }

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
  @IsNotEmptyObject({ nullable: false })
  @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: false })
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
  createdAt: Date;

  @ApiProperty({
    description: 'Last Update Date',
  })
  @IsDate()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'Whether or not the Entity is Public',
  })
  @IsBoolean()
  @Column({ default: false })
  isPublic: boolean;
}
