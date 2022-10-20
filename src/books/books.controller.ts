import { AuthUser } from '@/auth/auth.decorator';
import { CheckPolicies } from '@/casl/checkPolicies.decorator';
import { BookPoliciesGuard } from '@/casl/guards/bookPolicy.guard';
import {
  CreateGenericPolicyHandler,
  DeleteGenericPolicyHandler,
  ReadGenericPolicyHandler,
  UpdateGenericPolicyHandler,
} from '@/casl/handlers/GenericPolicy.handler';
import { AuthUserToken } from '@/common/dto/auth-user-payload.dto';
import { getOwnedPublicQuery } from '@/common/getOwnedPublicQuery';
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
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { QueryBookDto } from './dto/query-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@ApiBearerAuth()
@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(BookPoliciesGuard)
  @CheckPolicies(new CreateGenericPolicyHandler())
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    try {
      return await this.booksService.create(createBookDto);
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
    @Query() query?: QueryBookDto,
  ): Promise<Book[]> {
    const queries = getOwnedPublicQuery(user, query);
    return this.booksService.findAll({
      where: queries,
    });
  }

  @Get(':id')
  @UseGuards(BookPoliciesGuard)
  @CheckPolicies(new ReadGenericPolicyHandler())
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Book | null> {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(BookPoliciesGuard)
  @CheckPolicies(new UpdateGenericPolicyHandler())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<UpdateResult> {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @UseGuards(BookPoliciesGuard)
  @CheckPolicies(new DeleteGenericPolicyHandler())
  remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.booksService.remove(+id);
  }
}
