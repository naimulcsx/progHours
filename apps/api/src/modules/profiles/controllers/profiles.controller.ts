import { Controller, Get, Param } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags
} from "@nestjs/swagger";

import { Auth, AuthType } from "~/modules/auth/decorators/auth.decorator";

import { ProfilesService } from "../providers/profiles.service";

@Controller("profiles")
@ApiTags("Profiles")
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get("me")
  @ApiOperation({ summary: "Get current user profile" })
  @ApiBearerAuth("JWT")
  getMyProfile() {
    return [];
  }

  @Get(":username")
  @Auth(AuthType.None)
  @ApiOperation({ summary: "Get user profile by username" })
  @ApiParam({
    name: "username",
    description: "Username of the user to retrieve",
    example: "C181065"
  })
  getUserProfile(@Param("username") username: string) {
    return this.profilesService.getUserProfile(username);
  }
}
