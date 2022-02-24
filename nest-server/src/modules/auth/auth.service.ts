import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  getUser(username: string): Promise<User> {
    return this.usersRepository.findOne({ username });
  }
  comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
  async getAccessToken(body: any) {
    const { username, password } = body;
    const user = await this.getUser(username);
    if (!user) throw new BadRequestException(['user not found']);
    console.log(user);
    const isValidPassword = await this.comparePassword(password, user.password);
    //! if the user exists but the provided password is wrong
    if (!isValidPassword) throw new ForbiddenException(['invalid password']);
    const accessToken = jwt.sign(
      { id: user.id, username: user.username, name: user.name },
      process.env.ACCESS_TOKEN_SECRET,
    );
    return accessToken;
  }
  registerUser(userData): Promise<User[]> {
    const newUser = this.usersRepository.create({ ...userData, role: 'user' });
    return this.usersRepository.save(newUser);
  }
}
