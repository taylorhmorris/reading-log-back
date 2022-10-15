import { CaslModule } from '@/casl/casl.module';
import { User } from '@/users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from './entities/language.entity';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';

describe('LanguagesController', () => {
  let controller: LanguagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          cache: true,
          envFilePath: ['.env.test'],
          isGlobal: true,
        }),
        CaslModule,
      ],
      controllers: [LanguagesController],
      providers: [
        { provide: LanguagesService, useValue: jest.fn() },
        { provide: getRepositoryToken(User), useClass: Repository<User> },
        {
          provide: getRepositoryToken(Language),
          useClass: Repository<Language>,
        },
      ],
    }).compile();

    controller = module.get<LanguagesController>(LanguagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
