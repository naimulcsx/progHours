import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { ActiveUserData, User } from "~/modules/auth/decorators/user.decorator";

import { TrackerService } from "../services/tracker.service";

@Controller("tracker")
@ApiTags("Tracker")
export class TrackerController {
  constructor(private readonly trackerService: TrackerService) {}

  @Get("pull")
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Pull user submissions" })
  async pullSubmissions(@User() user: ActiveUserData) {
    return this.trackerService.pull(user.sub);
  }

  @Get("verify")
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Verify user submissions" })
  async verifySubmissions(@User() user: ActiveUserData) {
    return this.trackerService.verify(user.sub);
  }
}
