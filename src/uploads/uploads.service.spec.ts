import { AuthorsService } from '@/authors/authors.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UploadsService } from './uploads.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

let NEXT_ID = 0;

describe('UploadsService', () => {
  let service: UploadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadsService,
        {
          provide: AuthorsService,
          useValue: jest.fn(),
        },
      ],
    })
      .useMocker((token) => {
        if (token === AuthorsService)
          return {
            create: jest.fn().mockImplementation(() => {
              id: NEXT_ID++;
            }),
          };
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
        return jest.fn();
      })
      .compile();

    service = module.get<UploadsService>(UploadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
