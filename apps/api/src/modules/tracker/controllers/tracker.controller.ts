import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { TrackerService } from "../services/tracker.service";
import { Auth, AuthType } from "~/modules/iam/auth/decorators/auth.decorator";

@Controller("tracker")
@ApiTags("Tracker")
export class TrackerController {
  constructor(private readonly trackerService: TrackerService) {}

  @Get("pull")
  @Auth(AuthType.None)
  @ApiOperation({ summary: "Pull user submissions" })
  async pullSubmissions() {
    return {
      foo: "bar"
    };
  }
}
