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
  BadRequestException,
  Query,
} from "@nestjs/common"

import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
} from "@nestjs/swagger"

import { CreateSubmissionDto } from "@/validators/create-submission-dto"
import { UpdateSubmissionDto } from "@/validators/update-submission-dto"
import { SubmissionsService } from "@/modules/submissions/submissions.service"
import { IsAuthenticatedGuard } from "@/guards/is-authenticated"

@Controller("/submissions")
@ApiTags("submissions")
@UseGuards(IsAuthenticatedGuard)
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  /**
   * @GET /submissions
   * Get submissions for the current
   */
  @Get("/")
  @ApiOperation({ summary: "Returns the submissions for the current user" })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async getSubmissionsByUserId(@Param() params, @Req() req) {
    const result = await this.submissionsService.getSubmissionsByUsername(
      req.user.username
    )
    return {
      statusCode: HttpStatus.OK,
      body: {
        submissions: result,
      },
    }
  }

  @Get("/activities")
  async getAllSubmissions(@Query("page") page: number) {
    const result = await this.submissionsService.getAllSubmissions(page)
    return {
      statusCode: HttpStatus.OK,
      body: result,
    }
  }

  /**
   * @POST /submissions
   */
  @Post("/")
  @ApiOperation({ summary: "Create new submission." })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async createSubmission(
    @Body() { link, verdict, solveTime, solvedAt }: CreateSubmissionDto,
    @Req() req
  ) {
    const createdSubmission = await this.submissionsService.createSubmission({
      link,
      verdict,
      solveTime,
      solvedAt,
      userId: req.user.id,
    })
    return {
      statusCode: HttpStatus.CREATED,
      message: "Submission added!",
      body: createdSubmission,
    }
  }

  /**
   * @PATCH /submissions/:id
   */
  @Patch("/:id")
  @ApiOperation({ summary: "Update a particular submission." })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async updateSubmission(
    @Param("id") id: string,
    @Body() { verdict, solveTime, solvedAt }: UpdateSubmissionDto
  ) {
    await this.submissionsService.updateSubmission({
      id: Number(id),
      verdict,
      solveTime,
      solvedAt,
    })
    return {
      statusCode: HttpStatus.OK,
      message: "Submission updated!",
    }
  }

  /**
   * @DELETE /submissions/:id
   */
  @Delete("/:id")
  @ApiOperation({ summary: "Delete a particular submission." })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async deleteSubmission(@Param("id") id: any) {
    await this.submissionsService.deleteSubmission(Number(id))
    return {
      statusCode: HttpStatus.OK,
      message: "Submission deleted!",
    }
  }

  /**
   * GET /submissions/vjudge-contest-login
   */
  @Post("/vjudge-contest-login/:contestId")
  @ApiOperation({ summary: "Login into vjudge contest." })
  @ApiOkResponse({ description: "Success." })
  @ApiBadRequestResponse({ description: "Bad Request." })
  async vjudgeContestLogin(@Body() body, @Param() params) {
    const { password } = body
    try {
      const result = await this.submissionsService.loginIntoVjudgeContest(
        params.contestId,
        password
      )
      return result
    } catch (err) {
      throw new BadRequestException(err)
    }
  }
}
