import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
  getUser(username: string): Promise<User> {
    return this.usersRepository.findOne({ username });
  }
  registerUser(userData): Promise<User[]> {
    const newUser = this.usersRepository.create({ ...userData, role: 'user' });
    return this.usersRepository.save(newUser);
  }
}
