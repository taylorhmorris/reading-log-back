import { Author } from '@/authors/entities/author.entity';
import { Book } from '@/books/entities/book.entity';
import { OwnedEntity } from '@/common/entities/owned.entity';
import { Reading } from '@/readings/entities/reading.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

@Entity()
export class Note extends OwnedEntity {
  @ApiProperty({
    description: 'Note Content',
  })
  @IsString()
  @IsNotEmpty()
  @Column({ nullable: false })
  content: string;

  @ApiProperty({
    description: 'Note Target: Author',
  })
  @IsOptional()
  @ManyToOne(() => Author, { nullable: true, onDelete: 'CASCADE' })
  author?: Author;

  @ApiProperty({
    description: 'The id of the Author',
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  @RelationId((note: Note) => note.author)
  authorId?: number;

  @ApiProperty({
    description: 'Note Target: Book',
  })
  @IsOptional()
  @ManyToOne(() => Book, { nullable: true, onDelete: 'CASCADE' })
  book?: Book;

  @ApiProperty({
    description: 'The id of the Book',
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  @RelationId((note: Note) => note.book)
  bookId?: number;

  @ApiProperty({
    description: 'Note Target: Reading',
  })
  @IsOptional()
  @ManyToOne(() => Reading, { nullable: true, onDelete: 'CASCADE' })
  reading?: Reading;

  @ApiProperty({
    description: 'The id of the Author',
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  @RelationId((note: Note) => note.reading)
  readingId?: number;

  @ApiProperty({
    description: 'Reference page',
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Column({ nullable: true })
  page?: number;
}
