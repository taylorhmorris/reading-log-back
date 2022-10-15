import { CaslModule } from '@/casl/casl.module';
import { User } from '@/users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reading } from './entities/reading.entity';
import { ReadingsController } from './readings.controller';
import { ReadingsService } from './readings.service';

describe('ReadingsController', () => {
  let controller: ReadingsController;

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
      controllers: [ReadingsController],
      providers: [
        { provide: ReadingsService, useValue: jest.fn() },
        { provide: getRepositoryToken(User), useClass: Repository<User> },
        { provide: getRepositoryToken(Reading), useClass: Repository<Reading> },
      ],
    }).compile();

    controller = module.get<ReadingsController>(ReadingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
