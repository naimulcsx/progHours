import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  Req,
} from '@nestjs/common';
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
        throw new ForbiddenException('some error occured');
      }
    }
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
    const newSubmission = this.submissionsRepository.create({
      problem_id: problemId,
      user_id: user.id,
      ...body,
    });
    return this.submissionsRepository.save(newSubmission);
  }
}
