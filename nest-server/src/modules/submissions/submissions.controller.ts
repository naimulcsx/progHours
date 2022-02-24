import { Body, Controller, Post } from '@nestjs/common';
import { CreateSubmissionDto } from 'src/validators/create-submission-dto';
import { SubmissionsService } from './submissions.service';

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}
  @Post()
  async createSubmission(@Body() body: CreateSubmissionDto) {
    const res = await this.submissionsService.createSubmission(body);
    return {
      a: 'hello world',
      res,
    };
  }
}
