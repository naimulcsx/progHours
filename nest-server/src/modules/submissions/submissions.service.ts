import { BadRequestException, Inject, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParsersService } from '../parsers/parsers.service';
import { ProblemsService } from '../problems/problems.service';
import { Submission } from './submission.entity';

@Injectable()
export class SubmissionsService {
  constructor(
    @Inject(ProblemsService) private problemsService: ProblemsService,
    @Inject(ParsersService) private parsersService: ParsersService,
    @InjectRepository(Submission)
    private submissionsRepository: Repository<Submission>,
  ) {}

  async getSubmissions(userId) {
    const submissions = await this.submissionsRepository
      .createQueryBuilder('submissions')
      .where('submissions.user_id = :userId', { userId })
      .innerJoinAndSelect('submissions.problem_id', 'problems')
      .leftJoinAndSelect('problems.tags', 'tags')
      .leftJoinAndSelect('problems.user_tags', 'user_tags')
      .getMany();
    return submissions.map(({ problem_id, ...rest }) => ({
      ...rest,
      problem: problem_id,
    }));
  }

  async createSubmission(body: any, user: any) {
    const { link } = body;
    let problemId: number;
    const foundProblem = await this.problemsService.getProblem(link);
    if (foundProblem) problemId = foundProblem.id;
    else {
      /**
       ** If the problem does not exist in the database
       ** then we need to parse it and save it in our database
       */
      try {
        const problemData = await this.parsersService.parseProblem(link);
        const newProblem = await this.problemsService.createProblem({
          link,
          ...problemData,
        });
        problemId = newProblem.id;
      } catch (err) {
        console.log(err);
        throw new BadRequestException(['some error occured']);
      }
    }

    try {
      const foundSubmission = await this.submissionsRepository.findOne({
        problem_id: problemId,
        user_id: user.id,
      });
      if (foundSubmission) {
        /**
         ** If the same problem is added previously by the same user
         */
        throw new BadRequestException('you already added this problem');
      }
    } catch (err) {
      throw err;
    }

    const newSubmission = this.submissionsRepository.create({
      problem_id: problemId,
      user_id: user.id,
      ...body,
    });
    return this.submissionsRepository.save(newSubmission);
  }
}
