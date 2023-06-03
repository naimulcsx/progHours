import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { Auth, AuthType } from "~/modules/iam/auth/decorators/auth.decorator";
import {
  ActiveUserData,
  User
} from "~/modules/iam/auth/decorators/user.decorator";
import { Roles } from "~/modules/iam/auth/decorators/roles.decorator";
import { Role } from "~/modules/iam/auth/enums/role.enum";
import { UpdateUserDto } from "../dto/update-user.dto";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  @ApiOperation({ summary: "Get all users" })
  @ApiBearerAuth("JWT")
  @ApiOkResponse({
    description: "All users"
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized user"
  })
  async getUsers() {
    return [];
  }

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: "Create user" })
  @ApiBearerAuth("JWT")
  @ApiCreatedResponse({
    description: "User created"
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized user"
  })
  async createUser() {
    return {};
  }

  @Get("me")
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Get active user" })
  @ApiOkResponse({
    description: "Active user"
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized user"
  })
  async getActiveUser(@User() user: ActiveUserData) {
    return user;
  }

  @Get(":username")
  @Auth(AuthType.None)
  @ApiOperation({ summary: "Get user by username" })
  @ApiOkResponse({
    description: "User found"
  })
  @ApiNotFoundResponse({
    description: "User not found"
  })
  async getUser() {
    return {};
  }

  @Patch(":username")
  @Roles(Role.Regular)
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Update user by username" })
  @ApiOkResponse({
    description: "User updated"
  })
  @ApiNotFoundResponse({
    description: "User not found"
  })
  async updateUser(
    @Param() username: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return { username, updateUserDto };
  }
}
