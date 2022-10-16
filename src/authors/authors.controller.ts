import { AuthUser } from '@/auth/auth.decorator';
import { CheckPolicies } from '@/casl/checkPolicies.decorator';
import { AuthorPoliciesGuard } from '@/casl/guards/authorPolicy.guard';
import {
  CreateGenericPolicyHandler,
  DeleteGenericPolicyHandler,
  ReadGenericPolicyHandler,
  UpdateGenericPolicyHandler,
} from '@/casl/handlers/GenericPolicy.handler';
import { AuthUserToken } from '@/common/dto/auth-user-payload.dto';
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
  Logger,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  DeleteResult,
  EntityNotFoundError,
  FindOptionsWhere,
  UpdateResult,
} from 'typeorm';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { QueryAuthorDto } from './dto/query-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@ApiBearerAuth()
@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  private readonly logger = new Logger(AuthorsController.name);

  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthorPoliciesGuard)
  @CheckPolicies(new CreateGenericPolicyHandler())
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
  findAll(
    @AuthUser() user: AuthUserToken,
    @Query() query?: QueryAuthorDto,
  ): Promise<Author[]> {
    const queries: Array<FindOptionsWhere<Author>> = [];
    if (query) {
      this.logger.debug('query: ' + JSON.stringify(query));
      const queryOwned: FindOptionsWhere<Author> = { ...query };
      queryOwned.owner = { id: user.userId };
      const queryPublic = { ...query };
      queryPublic.isPublic = true;

      if (query.isPublic === undefined || query.isPublic === true)
        queries.push(queryPublic);
      if (query.ownerId === undefined || query.ownerId === user.userId)
        queries.push(queryOwned);
      this.logger.debug('queryOwned: ' + JSON.stringify(queryOwned));
      this.logger.debug('queryPublic: ' + JSON.stringify(queryPublic));
    }
    return this.authorsService.findAll({
      where: queries,
    });
  }

  @UseGuards(AuthorPoliciesGuard)
  @CheckPolicies(new ReadGenericPolicyHandler())
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
