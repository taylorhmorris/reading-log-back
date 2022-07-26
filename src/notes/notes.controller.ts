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
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { NotePoliciesGuard } from '@/casl/guards/notePolicy.guard';
import { CheckPolicies } from '@/casl/checkPolicies.decorator';
import {
  CreateGenericPolicyHandler,
  DeleteGenericPolicyHandler,
  ReadGenericPolicyHandler,
  UpdateGenericPolicyHandler,
} from '@/casl/handlers/GenericPolicy.handler';
import { AuthUser } from '@/auth/auth.decorator';
import { AuthUserToken } from '@/common/dto/auth-user-payload.dto';
import { QueryNoteDto } from './dto/query-note.dto';
import { getOwnedPublicQuery } from '@/common/getOwnedPublicQuery';

@ApiBearerAuth()
@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(NotePoliciesGuard)
  @CheckPolicies(new CreateGenericPolicyHandler())
  async create(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    try {
      return await this.notesService.create(createNoteDto);
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
    @Query() query?: QueryNoteDto,
  ): Promise<Note[]> {
    const queries = getOwnedPublicQuery(user, query);
    return this.notesService.findAll({
      where: queries,
    });
  }

  @Get(':id')
  @UseGuards(NotePoliciesGuard)
  @CheckPolicies(new ReadGenericPolicyHandler())
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Note | null> {
    return this.notesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(NotePoliciesGuard)
  @CheckPolicies(new UpdateGenericPolicyHandler())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<UpdateResult> {
    return this.notesService.update(+id, updateNoteDto);
  }

  @UseGuards(NotePoliciesGuard)
  @CheckPolicies(new DeleteGenericPolicyHandler())
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.notesService.remove(+id);
  }
}
