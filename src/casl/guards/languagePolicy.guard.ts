import { Language } from '@/languages/entities/language.entity';
import { User } from '@/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaslAbilityFactory } from '../casl-ability.factory';
import { PoliciesGuard } from './policy.guard';

@Injectable()
export class LanguagePoliciesGuard extends PoliciesGuard<Language> {
  constructor(
    protected reflector: Reflector,
    protected caslAbilityFactory: CaslAbilityFactory,
    protected configService: ConfigService,
    @InjectRepository(User)
    protected readonly usersRepository: Repository<User>,
    @InjectRepository(Language)
    protected readonly subjectRepository: Repository<Language>,
  ) {
    super(reflector, caslAbilityFactory, configService, usersRepository);
    this._subjectRepository = this.subjectRepository;
  }
}
