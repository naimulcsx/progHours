import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from "@nestjs/common";
import { UsersService } from "../services/users.service";
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
import { Auth, AuthType } from "~/modules/iam/auth/decorators/auth.decorator";
import {
  ActiveUserData,
  User
} from "~/modules/iam/auth/decorators/user.decorator";
import { Roles } from "~/modules/iam/auth/decorators/roles.decorator";
import { Role } from "~/modules/iam/auth/enums/role.enum";
import { UpdateUserDto } from "../dto/update-user.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserGuard } from "../guards/update-user.guard";

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

  @Get("whoami")
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

  @Patch(":username")
  @UseGuards(UpdateUserGuard)
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
}
