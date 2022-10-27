import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { User } from '@/users/entities/user.entity';
import { CaslModule } from '@/casl/casl.module';

@Module({
  imports: [TypeOrmModule.forFeature([Author, User]), CaslModule],
  controllers: [AuthorsController],
  providers: [AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
