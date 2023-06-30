import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("tracker")
@ApiTags("Tracker")
export class TrackerController {
  @Get("pull")
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Pull user submissions" })
  async pullSubmissions() {
    return {
      foo: "bar"
    };
  }
}
