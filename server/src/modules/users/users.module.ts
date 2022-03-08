import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Submission } from '../submissions/submission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Submission])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
