import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common"

/**
 * Import Guards
 */
import { IsAuthenticatedGuard } from "@/guards/is-authenticated"

/**
 * Import Services
 */
import { ProblemsService } from "@/modules/problems/problems.service"
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
} from "@nestjs/swagger"
import { ProblemDto } from "@/validators/problem-dto"

@Controller("problems")
@UseGuards(IsAuthenticatedGuard)
export class ProblemsController {
  constructor(private readonly problemService: ProblemsService) {}

  @Post("")
  @ApiOperation({ summary: "Create a new problem" })
  @ApiCreatedResponse({ description: "problem successfully created" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async createProblem(@Body() body: ProblemDto) {
    const newProblem = await this.problemService.createProblem(body)

    return { statusCode: HttpStatus.CREATED, body: { problems: newProblem } }
  }

  @Get("/:pid")
  @ApiOperation({ summary: "Get a particular problem" })
  @ApiCreatedResponse({ description: "Success" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async getProblemByProblemId(@Param("pid") pid) {
    const problem = await this.problemService.getProblem(pid)

    return { statusCode: HttpStatus.OK, body: { problem } }
  }

  @ApiOperation({ summary: "Update a problem" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @Patch("/:pid")
  async updateProblemByProblemId(
    @Body() body: ProblemDto,
    @Param("pid") pid: string
  ) {
    await this.problemService.updateProblem(body, pid)

    return { statusCode: HttpStatus.OK, message: "Problem Updated" }
  }

  @ApiOperation({ summary: "Delete a problem" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @Delete("/:pid")
  async deleteProblem(@Param("pid") pid: string) {
    await this.problemService.deleteProblem(pid)

    return { statusCode: HttpStatus.OK, message: "Problem deleted" }
  }
}
