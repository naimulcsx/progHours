import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { TrackerService } from "../services/tracker.service";
import {
  ActiveUserData,
  User
} from "~/modules/iam/auth/decorators/user.decorator";

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
}
