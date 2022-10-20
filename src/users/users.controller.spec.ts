import { CaslModule } from '@/casl/casl.module';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

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
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useClass: UsersService },
        { provide: getRepositoryToken(User), useClass: Repository<User> },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('update', () => {
    it('should allow users to modify their own username', () => {
      jest.spyOn(usersService, 'update').mockResolvedValue(new UpdateResult());
      const result = controller.update(1, { username: 'newName' });
      expect(result).resolves.toBeInstanceOf(UpdateResult);
    });
  });
});
