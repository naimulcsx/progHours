import { Body, Controller, Get, Post } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {
  ActiveUserData,
  User
} from "~/modules/iam/auth/decorators/user.decorator";
import { SubmissionsService } from "../services/submissions.service";
import { CreateSubmissionDto } from "../dto/create-submission.dto";

@Controller("submissions")
@ApiTags("Submissions")
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Create new submission" })
  async createSubmission(@Body() createSubmissionDto: CreateSubmissionDto) {
    return createSubmissionDto;
  }

  @Get()
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Get submissions of the active user" })
  @ApiOkResponse({
    description: "Submissions are returned"
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized user"
  })
  async getSubmissions(@User() user: ActiveUserData) {
    return this.submissionsService.getByUser(user.sub);
  }
}
