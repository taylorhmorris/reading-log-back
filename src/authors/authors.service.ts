import { User } from '@/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author: Author = new Author();
    author.firstNames = createAuthorDto.firstNames;
    author.lastName = createAuthorDto.lastName;
    author.owner = await this.userRepository.findOneByOrFail({
      id: createAuthorDto.ownerId,
    });
    return this.authorRepository.save(author);
  }

  findAll(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  findOne(id: number): Promise<Author | null> {
    return this.authorRepository.findOneBy({ id: id });
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<UpdateResult> {
    return this.authorRepository.update({ id: id }, updateAuthorDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.authorRepository.delete({ id: id });
  }
}
