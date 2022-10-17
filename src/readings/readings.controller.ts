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
import { ReadingsService } from './readings.service';
import { CreateReadingDto } from './dto/create-reading.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';
import { Reading } from './entities/reading.entity';
import { ReadingPoliciesGuard } from '@/casl/guards/readingPolicy.guard';
import { CheckPolicies } from '@/casl/checkPolicies.decorator';
import {
  CreateGenericPolicyHandler,
  DeleteGenericPolicyHandler,
  ReadGenericPolicyHandler,
  UpdateGenericPolicyHandler,
} from '@/casl/handlers/GenericPolicy.handler';
import { getOwnedPublicQuery } from '@/common/getOwnedPublicQuery';
import { QueryReadingDto } from './dto/query-reading.dto';
import { AuthUser } from '@/auth/auth.decorator';
import { AuthUserToken } from '@/common/dto/auth-user-payload.dto';

@ApiBearerAuth()
@ApiTags('readings')
@Controller('readings')
export class ReadingsController {
  constructor(private readonly readingsService: ReadingsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(ReadingPoliciesGuard)
  @CheckPolicies(new CreateGenericPolicyHandler())
  async create(@Body() createReadingDto: CreateReadingDto): Promise<Reading> {
    try {
      return await this.readingsService.create(createReadingDto);
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
    @Query() query?: QueryReadingDto,
  ): Promise<Reading[]> {
    const queries = getOwnedPublicQuery(user, query);
    return this.readingsService.findAll({
      where: queries,
    });
  }

  @Get(':id')
  @UseGuards(ReadingPoliciesGuard)
  @CheckPolicies(new ReadGenericPolicyHandler())
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Reading | null> {
    return this.readingsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(ReadingPoliciesGuard)
  @CheckPolicies(new UpdateGenericPolicyHandler())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReadingDto: UpdateReadingDto,
  ): Promise<UpdateResult> {
    return this.readingsService.update(+id, updateReadingDto);
  }

  @Delete(':id')
  @UseGuards(ReadingPoliciesGuard)
  @CheckPolicies(new DeleteGenericPolicyHandler())
  remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.readingsService.remove(+id);
  }
}
