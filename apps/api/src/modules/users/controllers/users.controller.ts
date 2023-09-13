import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";

import { Auth, AuthType } from "~/modules/auth/decorators/auth.decorator";
import { Roles } from "~/modules/auth/decorators/roles.decorator";
import { Role } from "~/modules/auth/enums/role.enum";

import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateHandlesDto } from "../dto/update-handles.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserAccessGuard } from "../guards/user-access.guard";
import { UsersService } from "../providers/users.service";

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
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get(":username")
  @Auth(AuthType.None)
  @ApiOperation({ summary: "Get user by username" })
  @ApiParam({
    name: "username",
    required: true,
    example: "c181065"
  })
  @ApiOkResponse({
    description: "User found"
  })
  @ApiNotFoundResponse({
    description: "User not found"
  })
  async getUser(@Param("username") username: string) {
    const user = await this.usersService.getUser(username);
    return user;
  }

  @Get(":username/handles")
  @Auth(AuthType.None)
  @ApiParam({
    name: "username",
    required: true,
    example: "c181065"
  })
  @ApiOperation({ summary: "Get user handles" })
  @ApiOkResponse({ description: "User handles retrieved" })
  async getUserHandles(@Param("username") username: string) {
    return this.usersService.getUserHandles(username);
  }

  @Patch(":username")
  @UseGuards(UserAccessGuard)
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Update user by username" })
  @ApiParam({
    name: "username",
    required: true,
    example: "c181065"
  })
  @ApiOkResponse({
    description: "User updated"
  })
  @ApiNotFoundResponse({
    description: "User not found"
  })
  async updateUser(
    @Param("username") username: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.updateUser(username, updateUserDto);
  }

  @Patch(":username/handles")
  @UseGuards(UserAccessGuard)
  @ApiBearerAuth("JWT")
  @ApiParam({
    name: "username",
    required: true,
    example: "c181065"
  })
  @ApiOperation({ summary: "Update user handles" })
  @ApiOkResponse({ description: "User handles updated" })
  async updateHandles(
    @Param("username") username: string,
    @Body() updateHandlesDto: UpdateHandlesDto
  ) {
    return this.usersService.updateUserHandles(username, updateHandlesDto);
  }
}
