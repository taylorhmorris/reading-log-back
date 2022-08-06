import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  constructor(src: any = undefined) {
    this.id = src?.id;
    this.username = src?.username;
    this.email = src?.email;
    this.password = src?.password;
  }
  @ApiProperty({
    description: "The User's id",
  })
  @IsPositive()
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'A unique username',
  })
  @IsString()
  @IsNotEmpty()
  @Column({ unique: true })
  username: string;

  @ApiProperty({
    description: 'A unique email',
  })
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: "The user's password",
  })
  @IsString()
  @IsNotEmpty()
  @Exclude()
  @Column()
  password: string;
}
