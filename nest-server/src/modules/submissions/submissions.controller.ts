import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IsAuthenticatedGuard } from 'src/guards/is-authenticated';
import { CreateSubmissionDto } from 'src/validators/create-submission-dto';
import { SubmissionsService } from './submissions.service';

@Controller('submissions')
@UseGuards(IsAuthenticatedGuard)
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}
  @Get()
  async getSubmissions(@Req() req) {
    const submissions = await this.submissionsService.getSubmissions(
      req.user.id,
    );
    return {
      submissions,
    };
  }
  @Post()
  async createSubmission(@Body() body: CreateSubmissionDto, @Req() req) {
    const { user } = req;
    await this.submissionsService.createSubmission(body, user);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'resource created',
    };
  }
}
