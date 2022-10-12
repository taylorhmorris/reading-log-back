import { CheckPolicies } from '@/casl/checkPolicies.decorator';
import { AuthorPoliciesGuard } from '@/casl/guards/authorPolicy.guard';
import { DeleteGenericPolicyHandler, UpdateGenericPolicyHandler } from '@/casl/handlers/GenericPolicy.handler';
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
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult, EntityNotFoundError, UpdateResult } from 'typeorm';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@ApiBearerAuth()
@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    try {
      return await this.authorsService.create(createAuthorDto);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new BadRequestException(error.message);
      } else {
        throw error;
      }
    }
  }

  @Get()
  findAll(): Promise<Author[]> {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Author | null> {
    return this.authorsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthorPoliciesGuard)
  @CheckPolicies(new UpdateGenericPolicyHandler())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<UpdateResult> {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  @UseGuards(AuthorPoliciesGuard)
  @CheckPolicies(new DeleteGenericPolicyHandler())
  remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.authorsService.remove(+id);
  }
}
