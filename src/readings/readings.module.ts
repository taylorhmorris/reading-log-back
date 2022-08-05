import { Module } from '@nestjs/common';
import { ReadingsService } from './readings.service';
import { ReadingsController } from './readings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import { Book } from '@/books/entities/book.entity';
import { Reading } from './entities/reading.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reading, User, Book])],
  controllers: [ReadingsController],
  providers: [ReadingsService],
})
export class ReadingsModule {}
