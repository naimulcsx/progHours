import { IsAuthenticatedGuard } from "@/guards/is-authenticated"
import { Controller, Get, Req, UseGuards } from "@nestjs/common"
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger"
import { StatsService } from "./stats.service"

@Controller("/stats")
@ApiTags("stats")
@UseGuards(IsAuthenticatedGuard)
export class StatsController {
  constructor(private readonly statsService: StatsService) {}
  @Get("/me")
  @ApiOperation({ summary: "Returns the statistics of the current user." })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async getStats(@Req() req) {
    const verdict_count = await this.statsService.getVerdictFrequency(
      req.user.id
    )
    const total_solve_time = await this.statsService.getSolveTime(req.user.id)
    const total_difficulty = await this.statsService.getAverageDifficulty(
      req.user.id
    )
    return {
      verdict_count,
      total_solve_time,
      total_difficulty,
    }
  }
}
