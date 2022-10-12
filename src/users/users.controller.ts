import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '@/auth/public.decorator';
import { CheckPolicies } from '@/casl/checkPolicies.decorator';
import { UserPoliciesGuard } from '@/casl/guards/userPolicy.guard';
import {
  DeleteGenericPolicyHandler,
  UpdateGenericPolicyHandler,
} from '@/casl/handlers/GenericPolicy.handler';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.create(createUserDto);
    return new User(user);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(UserPoliciesGuard)
  @CheckPolicies(new UpdateGenericPolicyHandler())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(UserPoliciesGuard)
  @CheckPolicies(new DeleteGenericPolicyHandler())
  remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.usersService.remove(+id);
  }
}
