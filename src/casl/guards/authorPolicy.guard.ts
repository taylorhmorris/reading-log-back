import { Author } from '@/authors/entities/author.entity';
import { User } from '@/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaslAbilityFactory } from '../casl-ability.factory';
import { PoliciesGuard } from './policy.guard';

@Injectable()
export class AuthorPoliciesGuard extends PoliciesGuard {
  constructor(
    protected reflector: Reflector,
    protected caslAbilityFactory: CaslAbilityFactory,
    protected configService: ConfigService,
    @InjectRepository(User)
    protected readonly usersRepository: Repository<User>,
    @InjectRepository(Author)
    protected readonly subjectRepository: Repository<Author>,
  ) {
    super(reflector, caslAbilityFactory, configService, usersRepository);
  }
  protected getRepository(): Repository<Author> {
    return this.subjectRepository;
  }
}
