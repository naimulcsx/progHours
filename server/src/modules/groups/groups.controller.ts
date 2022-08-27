import { IsAdmin } from "@/guards/is-admin"
import { IsAuthenticatedGuard } from "@/guards/is-authenticated"

import { AddUserToGroupDto } from "@/validators/add-user-to-group-dto"
import { CreateGroupDto } from "@/validators/create-group-dto"

import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger"

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common"
import { GroupRole } from "@prisma/client"
import { GroupsService } from "./groups.service"
import { UsersService } from "../users/users.service"

@ApiTags("Groups")
@Controller("groups")
@UseGuards(IsAuthenticatedGuard)
export class GroupsController {
  constructor(
    private groupsService: GroupsService,
    private readonly userService: UsersService
  ) {}

  @Post("/")
  @ApiOperation({ summary: "Create new group." })
  @ApiCreatedResponse({ description: "Login successful." })
  @ApiBadRequestResponse({
    description: "Hashtag taken or there are spaces in hashtag.",
  })
  async createGroup(@Body() body: CreateGroupDto, @Req() req) {
    const { name, hashtag } = body
    const user = await this.userService.getUserById(req.user.id)

    let group: any
    if (user.role === "ADMIN" || user.role === "MODERATOR") {
      // check if the hashtag has spaces in it
      if (hashtag.includes(" ")) {
        throw new BadRequestException("Spaces in hashtag is not allowed!")
      }

      // create the group
      group = await this.groupsService.createGroup(name, hashtag)

      // make the user as the OWNER of the group
      await this.groupsService.joinOnGroup({
        userId: req.user.id as number,
        groupId: group.id,
        role: GroupRole.ADMIN,
      })
    } else {
      throw new BadRequestException("Something went very wrong!")
    }

    // return the response
    return {
      statusCode: HttpStatus.CREATED,
      body: {
        group,
      },
    }
  }

  @Get("/")
  async getGroups(@Req() req) {
    // get the groups the current user is a part of
    const groups = await this.groupsService.getUserGroups(req.user.id)

    // return the response
    return {
      statusCode: HttpStatus.OK,
      body: {
        groups,
      },
    }
  }

  @Post("/join")
  async joinGroup(@Body() body, @Req() req) {
    await this.groupsService.joinGroupByCode(body.accessCode, req.user.id)
    return {
      statusCode: HttpStatus.OK,
    }
  }

  @Patch("/:id")
  async editGroup(@Param() params, @Body() body) {
    const { name, hashtag, private: isPrivate } = body

    // check if the hashtag has spaces in it
    if (hashtag.includes(" ")) {
      throw new BadRequestException("Spaces in hashtag is not allowed!")
    }

    // edit the group
    const group = await this.groupsService.editGroup(
      Number(params.id),
      name,
      hashtag,
      isPrivate
    )

    // return the response
    return {
      statusCode: HttpStatus.OK,
      body: {
        group,
      },
    }
  }

  @Delete("/:id")
  async deleteGroup(@Param() params) {
    // delete the group
    await this.groupsService.deleteGroup(Number(params.id))

    // deleted
    return {
      statusCode: HttpStatus.OK,
    }
  }

  @Get("/:hashtag")
  async getGroup(@Param() params, @Req() req) {
    const { group, groupUsers, ranklist } =
      await this.groupsService.getGroupByHashtag(params.hashtag)

    // check if the user is the owner of the group
    let isOwner = false
    for (let i = 0; i < groupUsers.length; ++i) {
      const user = groupUsers[i]
      if (user.userId === req.user.id && user.role === GroupRole.ADMIN) {
        isOwner = true
        break
      }
    }

    // return response
    return {
      body: {
        group,
        isOwner,
        users: groupUsers,
        ranklist,
      },
    }
  }

  @Post("/:id/members")
  async addUser(@Param() params, @Body() body: AddUserToGroupDto, @Req() req) {
    const usernames = body.username.split("\n").filter((el) => el.length > 0)

    // check if user is allowed to add members
    const groupOwner = await this.groupsService.isGroupOwner(
      Number(params.id),
      req.user.id
    )
    if (!groupOwner) {
      throw new ForbiddenException("You are not allowed!")
    }

    // add the user
    const { failed } = await this.groupsService.addUsersToGroup(
      Number(params.id),
      usernames
    )
    return {
      statusCode: HttpStatus.CREATED,
      message: `${usernames.length - failed.length} Members added!`,
      body: {
        failed,
      },
    }
  }

  @Delete("/:id/members/:userId")
  async removeUser(@Param() params) {
    const { id: groupId, userId } = params
    // remove the user
    const result = await this.groupsService.removeUserFromGroup(
      Number(groupId),
      Number(userId)
    )
    return {
      statusCode: HttpStatus.OK,
      message: "Member removed!",
    }
  }
}
