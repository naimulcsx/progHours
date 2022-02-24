import { Inject, Injectable } from '@nestjs/common';
import { ParsersService } from '../parsers/parsers.service';
import { ProblemsService } from '../problems/problems.service';
@Injectable()
export class SubmissionsService {
  constructor(
    @Inject(ProblemsService) private problemService: ProblemsService,
    @Inject(ParsersService) private parserService: ParsersService,
  ) {}
  async createSubmission(body: any) {
    const { link } = body;
    /**
     ** First check if the problem  already exists in the database
     ** Then we don't need to parse it again
     */

    const x = await this.parserService.parseProblem(link);
    return x;
  }
}
