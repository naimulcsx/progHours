import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission } from '../submissions/submission.entity';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Submission)
    private submissionsRepository: Repository<Submission>,
  ) {}
  async getRanklist() {
    const users = await this.usersRepository
      .createQueryBuilder('user')
      .select(['user.username', 'user.name', 'user.id'])
      .getMany();
    // console.log(users);
    const result = [];
    for (let user of users) {
      const acSolutions = await this.submissionsRepository
        .createQueryBuilder()
        .select('COUNT(verdict)')
        .where('user_id = :userId', { userId: user.id })
        .andWhere('verdict = :verdict', { verdict: 'AC' })
        .execute();

      const solveTime = await this.submissionsRepository
        .createQueryBuilder()
        .select('SUM(solve_time)')
        .where('user_id = :userId', { userId: user.id })
        .execute();

      result.push({
        ...user,
        solve_count: acSolutions[0].count,
        solve_time: solveTime[0].sum,
      });
    }
    return result;
  }
}
