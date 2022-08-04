import { User } from '@/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';

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
}
