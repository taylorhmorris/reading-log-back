import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './entities/language.entity';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {}

  create(
    createLanguageDto: CreateLanguageDto,
  ): Promise<CreateLanguageDto & Language> {
    return this.languageRepository.save(createLanguageDto);
  }

  findAll(): Promise<Language[]> {
    return this.languageRepository.find();
  }

  findOne(id: number): Promise<Language | null> {
    return this.languageRepository.findOneBy({ id: id });
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
