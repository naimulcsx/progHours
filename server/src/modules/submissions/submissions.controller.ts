import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Patch,
  Req,
  Delete,
  Param,
  UseGuards,
} from "@nestjs/common"

/**
 * Import Data Transfer Objects (DTO)
 */
import { CreateSubmissionDto } from "@/validators/create-submission-dto"
import { UpdateSubmissionDto } from "@/validators/update-submission-dto"

/**
 * Import Services
 */
import { SubmissionsService } from "@/modules/submissions/submissions.service"

/**
 * Import Guards
 */
import { IsAuthenticatedGuard } from "@/guards/is-authenticated"

@Controller("submissions")
@UseGuards(IsAuthenticatedGuard)
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}
  @Get()
  async getSubmissions(@Req() req) {
    const submissions = await this.submissionsService.getSubmissions(
      req.user.id
    )
    return {
      submissions,
    }
  }
  @Post()
  async createSubmission(@Body() body: CreateSubmissionDto, @Req() req) {
    const { user } = req
    await this.submissionsService.createSubmission(body, user)
    return {
      statusCode: HttpStatus.CREATED,
      message: "resource created",
    }
  }

  @Patch(":id")
  async updateSubmission(
    @Param("id") id: any,
    @Body() body: UpdateSubmissionDto
  ) {
    await this.submissionsService.updateSubmission(body, id)

    return {
      statusCode: HttpStatus.OK,
      message: "resource updated",
    }
  }

  @Delete(":id")
  async deleteSubmission(@Param("id") id: any) {
    await this.submissionsService.deleteSubmission(id)
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: "Resource deleted",
    }
  }
}
