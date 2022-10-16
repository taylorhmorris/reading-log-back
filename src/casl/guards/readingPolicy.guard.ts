import { Reading } from '@/readings/entities/reading.entity';
import { User } from '@/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaslAbilityFactory } from '../casl-ability.factory';
import { PoliciesGuard } from './policy.guard';

@Injectable()
export class ReadingPoliciesGuard extends PoliciesGuard<Reading> {
  constructor(
    protected reflector: Reflector,
    protected caslAbilityFactory: CaslAbilityFactory,
    protected configService: ConfigService,
    @InjectRepository(User)
    protected readonly usersRepository: Repository<User>,
    @InjectRepository(Reading)
    protected readonly subjectRepository: Repository<Reading>,
  ) {
    super(reflector, caslAbilityFactory, configService, usersRepository);
    this._subjectRepository = this.subjectRepository;
  }
}
