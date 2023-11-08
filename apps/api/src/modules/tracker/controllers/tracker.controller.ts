import { Controller, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { ActiveUserData, User } from "~/modules/auth/decorators/user.decorator";

import { TrackerService } from "../services/tracker.service";

@Controller("tracker")
@ApiTags("Tracker")
export class TrackerController {
  constructor(private readonly trackerService: TrackerService) {}

  @Post("retrieve")
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Retrieve and verify user submissions" })
  async retrieveSubmissions(@User() user: ActiveUserData) {
    return this.trackerService.retrieve(user.sub);
  }
}
