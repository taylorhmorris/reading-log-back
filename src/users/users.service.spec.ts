import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useClass: Repository<User> },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => {
              return 10;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('returns a created user on success', async () => {
      const createUserDto = new CreateUserDto();
      const user = new User();
      user.email = 'unique';
      createUserDto.password = 'password';
      jest.spyOn(usersRepository, 'save').mockResolvedValue(user);
      const ret = await service.create(createUserDto);
      expect(ret).toBe(user);
    });
  });
});
