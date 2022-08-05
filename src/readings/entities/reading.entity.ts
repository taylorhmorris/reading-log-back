import { Book } from '@/books/entities/book.entity';
import { OwnedEntity } from '@/common/entities/owned.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

@Entity()
export class Reading extends OwnedEntity {
  @ApiProperty({
    description: 'The Book',
  })
  @IsNotEmpty()
  @ManyToOne(() => Book, { onDelete: 'CASCADE' })
  book: Book;

  @ApiProperty({
    description: 'The id of the Book',
  })
  @IsInt()
  @IsPositive()
  @RelationId((reading: Reading) => reading.book)
  bookId: number;

  @ApiProperty({
    description: 'Number of pages read',
  })
  @IsInt()
  @IsPositive()
  @Column({ nullable: false, default: 0 })
  pagesRead: number;

  @ApiProperty({
    description: 'Start Date',
  })
  @IsDateString()
  @Column({ nullable: false })
  startDate: Date;

  @ApiProperty({
    description: 'End Date',
  })
  @IsDateString()
  @IsOptional()
  @Column({ nullable: true })
  endDate?: Date;
}
