import { User } from '@/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}
