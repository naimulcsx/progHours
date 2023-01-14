import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common"

/**
 * Import Guards
 */
import { IsAuthenticatedGuard } from "@/guards/is-authenticated"

/**
 * Import Services
 */
import { ProblemsService } from "@/modules/problems/problems.service"
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiTags,
} from "@nestjs/swagger"
import { ProblemDto } from "@/validators/problem-dto"
import { IsAdmin } from "@/guards/is-admin"
import { UpdateProblemDto } from "@/validators/update-problem-dto"

@ApiTags("Problems API")
@Controller("problems")
export class ProblemsController {
  constructor(private readonly problemService: ProblemsService) {}

  @Post("/")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new problem." })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: ProblemDto,
    description: "Record has been created successfully.",
  })
  @ApiBody({
    type: ProblemDto,
    description: "Data to create a new record.",
    required: true,
  })
  @ApiBadRequestResponse({
    description: "Bad Request.",
  })
  @ApiConsumes("application/json")
  @ApiProduces("application/json")
  @UseGuards(IsAuthenticatedGuard, IsAdmin)
  async createProblem(@Body() body: ProblemDto) {
    const newProblem = await this.problemService.createProblem(body)

    return { statusCode: HttpStatus.CREATED, body: { problems: newProblem } }
  }

  @Get("/")
  @ApiOperation({ summary: "Get all problems" })
  @ApiOkResponse({
    type: ProblemDto,
    description: "Records have been retrieved successfully.",
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: "No data found.",
  })
  @ApiProduces("application/json")
  @UseGuards(IsAuthenticatedGuard, IsAdmin)
  async getAllProblems() {
    const problems = await this.problemService.getAllProblems()

    return { statusCode: HttpStatus.OK, body: { problems } }
  }

  @Get(":pid")
  @ApiOperation({ summary: "Get problem by pid." })
  @ApiParam({
    name: "pid",
    description: "Should be an pid of a problem that exists in the database.",
    type: String,
    required: true,
  })
  @ApiOkResponse({
    description: "Record has been retrieved successfully.",
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: "Data not found",
  })
  @ApiProduces("application/json")
  @UseGuards(IsAuthenticatedGuard, IsAdmin)
  async getProblemByProblemId(@Param("pid") pid) {
    const problem = await this.problemService.getProblem(pid)

    return { statusCode: HttpStatus.OK, body: { problem } }
  }

  @Patch("/:pid")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update a problem" })
  @ApiOkResponse({
    description: "Record has been updated successfully.",
    type: UpdateProblemDto,
  })
  @ApiBody({
    type: UpdateProblemDto,
    description: "Data to update record.",
    required: true,
  })
  @ApiNotFoundResponse({
    description: "No data found.",
  })
  @ApiConsumes("application/json")
  @ApiProduces("application/json")
  @UseGuards(IsAuthenticatedGuard, IsAdmin)
  async updateProblemByProblemId(@Body() body: UpdateProblemDto, @Param("pid") pid: string) {
    await this.problemService.updateProblem(body, pid)

    return { statusCode: HttpStatus.OK, message: "Problem Updated" }
  }

  @Delete("/:pid")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a problem." })
  @ApiParam({
    name: "pid",
    description: "Should be an id of problem that exists in the database.",
    type: String,
    required: true,
  })
  @ApiNoContentResponse({
    description: "Record has been deleted successfully.",
  })
  @ApiNotFoundResponse({
    description: "No data found.",
  })
  @UseGuards(IsAuthenticatedGuard, IsAdmin)
  async deleteProblem(@Param("pid") pid: string) {
    await this.problemService.deleteProblem(pid)
    return { statusCode: HttpStatus.OK, message: "Problem deleted" }
  }
}
