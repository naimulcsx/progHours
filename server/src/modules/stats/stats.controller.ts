import { IsAuthenticatedGuard } from "@/guards/is-authenticated"
import { Controller, Get, Req, UseGuards, Param, NotFoundException, HttpStatus, Query } from "@nestjs/common"
import { ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { UsersService } from "@/modules/users/users.service"
import { StatsService } from "./stats.service"
import * as moment from "moment"

@Controller("/stats")
@ApiTags("stats")
export class StatsController {
  constructor(private readonly statsService: StatsService, private readonly usersService: UsersService) {}

  /**
   * GET /stats/me
   * Returns the statistics of the current user.
   */
  @Get("/me")
  @ApiOperation({ summary: "Returns the statistics of the current user." })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @UseGuards(IsAuthenticatedGuard)
  async getStats(@Req() req) {
    const stats = await this.statsService.getUserStats(req.user.id)
    return stats
  }

  /**
   * GET /stats
   * Returns the ranklist of the users
   */
  @Get("/")
  @ApiOperation({ summary: "Returns the ranklist of the users." })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async getRanklist(@Query("type") type) {
    let result = null
    if (type === "currentWeek") {
      let lastSat = moment(new Date())

      // find the last saturday
      while (lastSat.day() !== 6) lastSat = lastSat.subtract(1, "day")

      // query the result
      result = await this.statsService.getWeeklyLeaderboard(
        lastSat.format("YYYY-MM-DD"),
        moment(new Date()).add(1, "day").format("YYYY-MM-DD")
      )

      // return response
      return {
        statusCode: HttpStatus.OK,
        body: {
          fromDate: lastSat.format("YYYY-MM-DD"),
          toDate: moment(new Date()).format("YYYY-MM-DD"),
          stats: result,
        },
      }
    }

    // last week
    if (type === "lastWeek") {
      let lastSat = moment(new Date())

      // find the last saturday
      while (lastSat.day() !== 6) lastSat = lastSat.subtract(1, "day")
      lastSat = lastSat.subtract(7, "days")

      // query the result
      result = await this.statsService.getWeeklyLeaderboard(
        lastSat.format("YYYY-MM-DD"),
        moment(lastSat).add(7, "day").format("YYYY-MM-DD")
      )

      // return response
      return {
        statusCode: HttpStatus.OK,
        body: {
          fromDate: lastSat.format("YYYY-MM-DD"),
          toDate: lastSat.add(6, "day").format("YYYY-MM-DD"),
          stats: result,
        },
      }
    }

    // this month
    if (type === "currentMonth") {
      const start = moment({
        date: 1,
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      })

      const end = moment(new Date())

      // query the result
      result = await this.statsService.getWeeklyLeaderboard(
        start.format("YYYY-MM-DD"),
        end.add(1, "day").format("YYYY-MM-DD")
      )

      // return response
      return {
        statusCode: HttpStatus.OK,
        body: {
          fromDate: start.format("YYYY-MM-DD"),
          toDate: end.format("YYYY-MM-DD"),
          stats: result,
        },
      }
    }

    // last month
    if (type === "lastMonth") {
      const start = moment({
        date: 1,
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      }).subtract(1, "months")

      const end = moment(start).endOf("month").subtract(1, "day")

      // query the result
      result = await this.statsService.getWeeklyLeaderboard(
        start.format("YYYY-MM-DD"),
        end.add(1, "day").format("YYYY-MM-DD")
      )

      // return response
      return {
        statusCode: HttpStatus.OK,
        body: {
          fromDate: start.format("YYYY-MM-DD"),
          toDate: end.format("YYYY-MM-DD"),
          stats: result,
        },
      }
    }

    // full leaderboard
    result = await this.statsService.getRankList()
    return {
      statusCode: HttpStatus.OK,
      body: {
        stats: result,
      },
    }
  }

  /**
   * GET /stats/ranklist-live
   * Returns the ranklist of the users
   */
  // @Get("/ranklist-live")
  // @ApiOperation({
  //   summary:
  //     "Returns the ranklist of the users (aggregate from current database state).",
  // })
  // @ApiOkResponse({ description: "Success." })
  // @ApiForbiddenResponse({ description: "Forbidden." })
  // async getLiveRanklist() {
  //   const result = await this.statsService.getLiveRanklist()
  //   return {
  //     ranklist: result,
  //   }
  // }

  /**
   * GET /stats/{username}
   * Returns the statistics of a particular user.
   */
  @Get("/:username")
  @ApiOperation({ summary: "Returns the statistics of a particular user." })
  @ApiOkResponse({ description: "Success." })
  @ApiNotFoundResponse({ description: "Username not found!" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async getStatsByUsername(@Param() params) {
    const user = await this.usersService.getUserByUsername(params.username)
    if (!user) {
      return new NotFoundException("User not found!")
    }
    const stats = await this.statsService.getUserStats(user.id)
    return {
      statusCode: HttpStatus.OK,
      body: {
        stats,
      },
    }
  }
}
