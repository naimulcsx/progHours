import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common"

/**
 * Import Guards
 */
import { IsAuthenticatedGuard } from "@/guards/is-authenticated"

/**
 * Import Services
 */
import { ProblemsService } from "@/modules/problems/problems.service"
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOperation } from "@nestjs/swagger"
import { ProblemDto } from "@/validators/problem-dto"
import { IsAdmin } from "@/guards/is-admin"

@Controller("problems")
export class ProblemsController {
  constructor(private readonly problemService: ProblemsService) {}

  @Post("")
  @ApiOperation({ summary: "Create a new problem" })
  @ApiCreatedResponse({ description: "problem successfully created" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @UseGuards(IsAuthenticatedGuard, IsAdmin)
  async createProblem(@Body() body: ProblemDto) {
    const newProblem = await this.problemService.createProblem(body)

    return { statusCode: HttpStatus.CREATED, body: { problems: newProblem } }
  }

  @Get("/")
  @ApiOperation({ summary: "Get all problems" })
  @ApiCreatedResponse({ description: "Success" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @UseGuards(IsAuthenticatedGuard, IsAdmin)
  async getAllProblems() {
    const problems = await this.problemService.getAllProblems()

    return { statusCode: HttpStatus.OK, body: { problems } }
  }

  @Get("/:pid")
  @ApiOperation({ summary: "Get a particular problem" })
  @ApiCreatedResponse({ description: "Success" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @UseGuards(IsAuthenticatedGuard, IsAdmin)
  async getProblemByProblemId(@Param("pid") pid) {
    const problem = await this.problemService.getProblem(pid)

    return { statusCode: HttpStatus.OK, body: { problem } }
  }

  @Patch("/:pid")
  @ApiOperation({ summary: "Update a problem" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @UseGuards(IsAuthenticatedGuard, IsAdmin)
  async updateProblemByProblemId(@Body() body: ProblemDto, @Param("pid") pid: string) {
    await this.problemService.updateProblem(body, pid)

    return { statusCode: HttpStatus.OK, message: "Problem Updated" }
  }

  @Delete("/:pid")
  @ApiOperation({ summary: "Delete a problem" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @UseGuards(IsAuthenticatedGuard, IsAdmin)
  async deleteProblem(@Param("pid") pid: string) {
    await this.problemService.deleteProblem(pid)

    return { statusCode: HttpStatus.OK, message: "Problem deleted" }
  }
}
