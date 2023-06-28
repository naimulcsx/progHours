import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
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
import { UpdateSubmissionDto } from "../dto/update-sumission.dto";
import { UpdateSubmissionGuard } from "../guards/update-submission.guard";

@Controller("submissions")
@ApiTags("Submissions")
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Create new submission" })
  @ApiCreatedResponse({ description: "Submission created" })
  @ApiUnauthorizedResponse({ description: "Unauthorized user" })
  async createSubmission(
    @User() user: ActiveUserData,
    @Body() createSubmissionDto: CreateSubmissionDto
  ) {
    return this.submissionsService.create(user.sub, createSubmissionDto);
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

  @Patch(":id")
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Update a submission" })
  @ApiOkResponse({ description: "Submission updated" })
  @ApiNotFoundResponse({ description: "Submission not found" })
  @ApiUnauthorizedResponse({ description: "Unauthorized user" })
  @UseGuards(UpdateSubmissionGuard)
  async updateSubmission(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateSubmissionDto: UpdateSubmissionDto
  ) {
    return this.submissionsService.update(id, updateSubmissionDto);
  }

  @Delete(":id")
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Delete a submission" })
  @ApiOkResponse({ description: "Submission deleted" })
  @ApiUnauthorizedResponse({ description: "Unauthorized user" })
  async deleteSubmission(@Param("id", ParseIntPipe) id: number) {
    return this.submissionsService.delete(id);
  }
}
