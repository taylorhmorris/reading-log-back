import { CaslModule } from '@/casl/casl.module';
import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';

describe('AuthorsController', () => {
  let controller: AuthorsController;

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
      controllers: [AuthorsController],
      providers: [
        { provide: AuthorsService, useValue: jest.fn() },
        { provide: getRepositoryToken(Author), useClass: Repository<Author> },
        { provide: UsersService, useClass: UsersService },
        { provide: getRepositoryToken(User), useClass: Repository<User> },
      ],
    }).compile();

    controller = module.get<AuthorsController>(AuthorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
