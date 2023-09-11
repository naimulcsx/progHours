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
  async getActiveUser(@User() activeUser: ActiveUserData) {
    const user = await this.usersService.getUser(activeUser.username);
    delete user.password;
    return user;
  }
}
