import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthorsModule } from './authors/authors.module';
import { LanguagesModule } from './languages/languages.module';
import { BooksModule } from './books/books.module';
import { ReadingsModule } from './readings/readings.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        host: configService.get('DATABASE_URL')
          ? undefined
          : configService.get('DB_HOST'),
        port: configService.get('DATABASE_URL')
          ? undefined
          : configService.get('DB_PORT'),
        username: configService.get('DATABASE_URL')
          ? undefined
          : configService.get('POSTGRES_USER'),
        password: configService.get('DATABASE_URL')
          ? undefined
          : configService.get('POSTGRES_PASSWORD'),
        database: configService.get('DATABASE_URL')
          ? undefined
          : configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: configService.get('DB_SYNC'),
        ssl: configService.get('DATABASE_URL')
          ? {
              rejectUnauthorized: false,
            }
          : false,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthorsModule,
    LanguagesModule,
    BooksModule,
    ReadingsModule,
    AuthModule,
    NotesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
