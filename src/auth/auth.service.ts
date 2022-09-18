import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<any> {
    let users: User[] | null;
    let user: User | null;
    if (loginDto.username) {
      users = await this.usersService.findAll({ username: loginDto.username });
    } else if (loginDto.email) {
      users = await this.usersService.findAll({ email: loginDto.email });
    } else {
      return null;
    }
    if (users && users.length === 1) {
      user = users[0];
    } else {
      return null;
    }
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      id: user.id,
      access_token: this.jwtService.sign(payload),
      isAdmin: user.isAdmin,
    };
  }
}
