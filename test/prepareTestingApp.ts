import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

export async function prepareTestingApp(): Promise<INestApplication> {
  const app: INestApplication;

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        cache: true,
        envFilePath: ['.env.test', '.env.development', '.env'],
        isGlobal: true,
      }),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          autoLoadEntities: true,
          synchronize: configService.get('DB_SYNC'),
          dropSchema: true,
        }),
        inject: [ConfigService],
      }),
    ],
  }).compile();

  app = moduleFixture.createNestApplication();

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  return app;
}