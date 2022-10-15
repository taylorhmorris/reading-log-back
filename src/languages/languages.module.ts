import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from './entities/language.entity';
import { User } from '@/users/entities/user.entity';
import { CaslModule } from '@/casl/casl.module';

@Module({
  imports: [TypeOrmModule.forFeature([Language, User]), CaslModule],
  controllers: [LanguagesController],
  providers: [LanguagesService],
})
export class LanguagesModule {}
