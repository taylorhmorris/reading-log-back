import { Author } from '@/authors/entities/author.entity';
import { OwnedEntity } from '@/common/entities/owned.entity';
import { Language } from '@/languages/entities/language.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

@Entity()
export class Book extends OwnedEntity {
  @ApiProperty({
    description: 'Author of the Book',
  })
  @IsNotEmpty()
  @ManyToOne(() => Author, { onDelete: 'CASCADE' })
  author: Author;

  @ApiProperty({
    description: 'The id of the Author',
  })
  @IsInt()
  @IsPositive()
  @RelationId((book: Book) => book.author)
  authorId: number;

  @ApiProperty({
    description: 'Title of the Book',
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  title: string;

  @ApiProperty({
    description: 'Number of pages',
  })
  @IsInt()
  @IsPositive()
  @Column({ nullable: false })
  length: number;

  @ApiProperty({
    description: 'Language of the Book',
  })
  @IsNotEmpty()
  @ManyToOne(() => Language, { onDelete: 'CASCADE' })
  language: Language;

  @ApiProperty({
    description: 'The id of the Language',
  })
  @IsInt()
  @IsPositive()
  @RelationId((book: Book) => book.language)
  languageId: number;

  @ApiProperty({
    description: 'Date Publication',
  })
  @IsDate()
  @IsOptional()
  @Column({ nullable: true })
  publicationDate?: Date;

  @ApiProperty({
    description: 'Number of pages',
  })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  edition?: string;
}
