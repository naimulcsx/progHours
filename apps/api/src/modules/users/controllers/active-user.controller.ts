import { Controller, Get } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";

import { ActiveUserData, User } from "../../auth/decorators/user.decorator";
import { UsersService } from "../providers/users.service";

@ApiTags("Active User")
@Controller("users/me")
export class ActiveUserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Get active user" })
  @ApiOkResponse({
    description: "Active user"
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized user"
  })
  async getActiveUser(@User() user: ActiveUserData) {
    return this.usersService.getUser(user.username);
  }
}
