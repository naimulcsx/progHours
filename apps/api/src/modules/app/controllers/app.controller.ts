import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { Auth, AuthType } from "~/modules/auth/decorators/auth.decorator";

import info from "./appinfo.json";

@ApiTags("App")
@Controller("app")
export class AppController {
  @Get("info")
  @Auth(AuthType.None)
  @ApiOperation({ summary: "Get app info" })
  async getAppInfo() {
    return info;
  }
}
