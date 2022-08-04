import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './entities/language.entity';

@ApiTags('languages')
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Post()
  create(
    @Body() createLanguageDto: CreateLanguageDto,
  ): Promise<CreateLanguageDto & Language> {
    return this.languagesService.create(createLanguageDto);
  }

  @Get()
  findAll(): Promise<Language[]> {
    return this.languagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Language | null> {
    return this.languagesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ): Promise<UpdateResult> {
    return this.languagesService.update(+id, updateLanguageDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.languagesService.remove(+id);
  }
}
