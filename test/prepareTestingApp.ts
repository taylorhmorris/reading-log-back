import { AuthModule } from '@/auth/auth.module';
import { AuthorsModule } from '@/authors/authors.module';
import { Author } from '@/authors/entities/author.entity';
import { BooksModule } from '@/books/books.module';
import { Book } from '@/books/entities/book.entity';
import { Language } from '@/languages/entities/language.entity';
import { LanguagesModule } from '@/languages/languages.module';
import { Note } from '@/notes/entities/note.entity';
import { NotesModule } from '@/notes/notes.module';
import { Reading } from '@/readings/entities/reading.entity';
import { ReadingsModule } from '@/readings/readings.module';
import { User } from '@/users/entities/user.entity';
import { UsersModule } from '@/users/users.module';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';

export async function prepareTestingApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      UsersModule,
      AuthorsModule,
      BooksModule,
      LanguagesModule,
      ReadingsModule,
      NotesModule,
      AuthModule,
      ConfigModule.forRoot({
        cache: true,
        envFilePath: ['.env.test', '.env.local', '.env'],
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
          entities: [Author, Book, Language, Note, Reading, User],
          synchronize: configService.get('DB_SYNC'),
          dropSchema: true,
        }),
        inject: [ConfigService],
      }),
    ],
    providers: [
      {
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
      },
    ],
  }).compile();

  const app = moduleFixture.createNestApplication();

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
