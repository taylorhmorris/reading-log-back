import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { QueryUserDto } from './dto/query-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const roundsString: string | undefined =
      this.configService.get<string>('NESTJS_SALT_ROUNDS');
    if (!roundsString) throw 'SaltRounds not set, cannot hash password';
    const rounds: number = parseInt(roundsString);
    if (!rounds) throw 'SaltRounds not set, cannot hash password';
    const hashedPassword = await bcrypt.hash(createUserDto.password, rounds);
    createUserDto.password = hashedPassword;
    return this.usersRepository.save(createUserDto);
  }

  findAll(query?: QueryUserDto): Promise<User[]> {
    return this.usersRepository.find({ where: query });
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id: id });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.usersRepository.update({ id: id }, updateUserDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete({ id: id });
  }
}
