import { Inject, Injectable } from '@nestjs/common';
import { ProblemsService } from '../problems/problems.service';

@Injectable()
export class SubmissionsService {
  constructor(
    @Inject(ProblemsService) private problemService: ProblemsService,
  ) {}
  async createSubmission(body: any) {
    const { link } = body;

    /**
     ** First check if the problem  already exists in the database
     ** Then we don't need to parse it again
     */
    if (this.problemService.problemExists(link)) {
    } else {
      // parse the problem
    }
    // const submission = await this.problemService.createProblem(body);
  }
}
