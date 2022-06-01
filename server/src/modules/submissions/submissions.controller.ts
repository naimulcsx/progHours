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
} from "@nestjs/common"

import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiForbiddenResponse,
} from "@nestjs/swagger"

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

@Controller("/submissions")
@ApiTags("submissions")
@UseGuards(IsAuthenticatedGuard)
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  /**
   * POST /submissions
   * Create new submission
   */
  @Post("/")
  @ApiOperation({ summary: "Create new submission." })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async createSubmission(@Body() body: CreateSubmissionDto, @Req() req) {
    const { user } = req
    try {
      await this.submissionsService.createSubmission(body, user)
      return {}
    } catch (err) {
      throw err
    }
  }

  /**
   * PATCH /submissions/:id
   * Update a particular submission
   */
  @Patch("/:id")
  @ApiOperation({ summary: "Update a particular submission." })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async updateSubmission(
    @Param("id") id: string,
    @Body() body: UpdateSubmissionDto
  ) {
    await this.submissionsService.updateSubmission(body, id)

    return {
      statusCode: HttpStatus.OK,
      message: "resource updated",
    }
  }

  /**
   * DELETE /submissions/:id
   * Delete a particular submission
   */
  @Delete("/:id")
  @ApiOperation({ summary: "Delete a particular submission." })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async deleteSubmission(@Param("id") id: any) {
    await this.submissionsService.deleteSubmission(id)
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: "Resource deleted",
    }
  }

  /**
   * GET /submissions/by/me
   * Returns the submissions of the current logged in user
   */
  @Get("/by/me")
  @ApiOperation({ summary: "Returns the submissions by current user" })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async getSubmissionsForCurrentUser(@Req() req) {
    const submissions = await this.submissionsService.getSubmissions(
      req.user.id
    )
    return {
      submissions,
    }
  }

  /**
   * GET /submissions/by/:username
   * Returns the submissions submitted by a particular user
   */
  @Get("/by/:username")
  @ApiOperation({ summary: "Returns the submissions by username" })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async getSubmissionsByUserId(@Param() params) {
    const result = await this.submissionsService.getSubmissionsByUsername(
      params.username
    )
    return result
  }
}
