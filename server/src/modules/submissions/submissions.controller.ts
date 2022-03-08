import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  Post,
  Patch,
  Req,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { IsAuthenticatedGuard } from 'src/guards/is-authenticated';
import { CreateSubmissionDto } from 'src/validators/create-submission-dto';
import { UpdateSubmissionDto } from 'src/validators/update-submission-dto';
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
      results: submissions.length,
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

  @Patch(':id')
  async updateSubmission(
    @Param('id') id: any,
    @Body() body: UpdateSubmissionDto,
  ) {
    await this.submissionsService.updateSubmission(body, id);

    return {
      statusCode: HttpStatus.OK,
      message: 'resource updated',
    };
  }

  @Delete(':id')
  async deleteSubmission(@Param('id') id: any) {
    await this.submissionsService.deleteSubmission(id);

    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Resource deleted',
    };
  }
}
