import { User } from '@/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './entities/language.entity';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createLanguageDto: CreateLanguageDto): Promise<Language> {
    const language = new Language();
    language.name = createLanguageDto.name;
    language.owner = await this.userRepository.findOneByOrFail({
      id: createLanguageDto.ownerId,
    });
    return this.languageRepository.save(language);
  }

  findAll(query?: FindManyOptions<Language>): Promise<Language[]> {
    return this.languageRepository.find(query);
  }

  findOne(id: number): Promise<Language | null> {
    return this.languageRepository.findOneByOrFail({ id: id });
  }

  update(
    id: number,
    updateLanguageDto: UpdateLanguageDto,
  ): Promise<UpdateResult> {
    return this.languageRepository.update({ id: id }, updateLanguageDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.languageRepository.delete({ id: id });
  }
}
