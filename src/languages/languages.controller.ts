import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  BadRequestException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult, EntityNotFoundError, UpdateResult } from 'typeorm';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './entities/language.entity';
import { LanguagePoliciesGuard } from '@/casl/guards/languagePolicy.guard';
import { CheckPolicies } from '@/casl/checkPolicies.decorator';
import {
  CreateGenericPolicyHandler,
  DeleteGenericPolicyHandler,
  ReadGenericPolicyHandler,
  UpdateGenericPolicyHandler,
} from '@/casl/handlers/GenericPolicy.handler';
import { getOwnedPublicQuery } from '@/common/getOwnedPublicQuery';
import { AuthUser } from '@/auth/auth.decorator';
import { AuthUserToken } from '@/common/dto/auth-user-payload.dto';
import { QueryLanguageDto } from './dto/query-language.dto';

@ApiBearerAuth()
@ApiTags('languages')
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(LanguagePoliciesGuard)
  @CheckPolicies(new CreateGenericPolicyHandler())
  async create(
    @Body() createLanguageDto: CreateLanguageDto,
  ): Promise<Language> {
    try {
      return await this.languagesService.create(createLanguageDto);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new BadRequestException(error.message);
      } else {
        throw error;
      }
    }
  }

  @Get()
  findAll(
    @AuthUser() user: AuthUserToken,
    @Query() query?: QueryLanguageDto,
  ): Promise<Language[]> {
    const queries = getOwnedPublicQuery(user, query);
    return this.languagesService.findAll({
      where: queries,
    });
  }

  @Get(':id')
  @UseGuards(LanguagePoliciesGuard)
  @CheckPolicies(new ReadGenericPolicyHandler())
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Language | null> {
    return this.languagesService.findOne(id);
  }

  @UseGuards(LanguagePoliciesGuard)
  @CheckPolicies(new UpdateGenericPolicyHandler())
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ): Promise<UpdateResult> {
    return this.languagesService.update(+id, updateLanguageDto);
  }

  @UseGuards(LanguagePoliciesGuard)
  @CheckPolicies(new DeleteGenericPolicyHandler())
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.languagesService.remove(+id);
  }
}
