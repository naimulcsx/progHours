import { IsAuthenticatedGuard } from "@/guards/is-authenticated"

import { AddUserToGroupDto } from "@/validators/group/add-user-to-group-dto"

import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiTags,
} from "@nestjs/swagger"

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
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
import { IsAdminOrModerator } from "@/guards/is-admin-or-moderator"
import { CreateGroupDto } from "@/validators/group/create-group-dto"
import { JoinGroupDto } from "@/validators/group/join-group-dto"
import { UpdateGroupDto } from "@/validators/group/update-group-dto"

@ApiTags("Groups")
@Controller("groups")
@UseGuards(IsAuthenticatedGuard)
export class GroupsController {
  constructor(private groupsService: GroupsService, private readonly userService: UsersService) {}

  @Post("/")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new group." })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: CreateGroupDto,
    description: "Record has been created successfully.",
  })
  @ApiBody({
    type: CreateGroupDto,
    description: "Data to create a new record.",
    required: true,
  })
  @ApiBadRequestResponse({
    description: "Slug taken or there are spaces in slug.",
  })
  @ApiConsumes("application/json")
  @ApiProduces("application/json")
  @UseGuards(IsAdminOrModerator)
  async createGroup(@Body() body: CreateGroupDto, @Req() req) {
    const { name, slug } = body

    let group: any

    // check if the slug has spaces in it
    if (slug.includes(" ")) {
      throw new BadRequestException("Spaces in slug is not allowed!")
    }

    // create the group
    group = await this.groupsService.createGroup(name, slug)

    // make the user as the OWNER of the group
    await this.groupsService.joinOnGroup({
      userId: req.user.id as number,
      groupId: group.id,
      role: GroupRole.ADMIN,
    })

    // return the response
    return {
      statusCode: HttpStatus.CREATED,
      message: "Group created",
      body: {
        group,
      },
    }
  }

  @Get("/")
  @ApiOperation({ summary: "Get all groups" })
  @ApiOkResponse({
    description: "Records have been retrieved successfully.",
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: "No data found.",
  })
  @ApiProduces("application/json")
  async getGroups(@Req() req) {
    // get the groups the current user is a part of
    const userGroups = await this.groupsService.getUserGroups(req.user.id)

    // all groups - for ADMIN
    let groups: Awaited<ReturnType<typeof this.groupsService.getGroups | undefined>> = undefined
    if (req.user.role === "ADMIN") {
      groups = await this.groupsService.getGroups()
    }

    // return the response
    return {
      statusCode: HttpStatus.OK,
      body: {
        userGroups,
        groups,
      },
    }
  }

  @Post("/join")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Join to a group" })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: JoinGroupDto,
    description: "Record has been created successfully.",
  })
  @ApiBody({
    type: JoinGroupDto,
    description: "Data to create a new record.",
    required: true,
  })
  @ApiBadRequestResponse({
    description: "Bad request.",
  })
  @ApiConsumes("application/json")
  @ApiProduces("application/json")
  async joinGroup(@Body() body: JoinGroupDto, @Req() req) {
    await this.groupsService.joinGroupByCode(body.accessCode, req.user.id)
    return {
      statusCode: HttpStatus.OK,
    }
  }

  @Patch("/:id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update group information" })
  @ApiParam({
    name: "id",
    description: "Should be an id of a group that exists in the database.",
    type: Number,
    required: true,
  })
  @ApiOkResponse({
    description: "Record has been updated successfully.",
    type: UpdateGroupDto,
  })
  @ApiBody({
    type: UpdateGroupDto,
    description: "Data to update record.",
    required: true,
  })
  @ApiNotFoundResponse({
    description: "No data found.",
  })
  @ApiConsumes("application/json")
  @ApiProduces("application/json")
  @UseGuards(IsAdminOrModerator)
  async editGroup(@Req() req, @Param() params, @Body() body: UpdateGroupDto) {
    const { name, slug, private: isPrivate } = body

    // check if the slug has spaces in it
    if (slug.includes(" ")) {
      throw new BadRequestException("Spaces in slug is not allowed!")
    }

    // edit the group
    const group = await this.groupsService.editGroup(Number(params.id), name, slug, isPrivate)

    // return the response
    return {
      statusCode: HttpStatus.OK,
      message: "Group deleted",
      body: {
        group,
      },
    }
  }

  @Delete("/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a group." })
  @ApiParam({
    name: "id",
    description: "Should be an id of a group that exists in the database.",
    type: Number,
    required: true,
  })
  @ApiNoContentResponse({
    description: "Record has been deleted successfully.",
  })
  @ApiNotFoundResponse({
    description: "No data found.",
  })
  @UseGuards(IsAdminOrModerator)
  async deleteGroup(@Param() params) {
    await this.groupsService.deleteGroup(Number(params.id))

    return {
      statusCode: HttpStatus.OK,
    }
  }

  @Get("/:slug")
  @ApiOperation({ summary: "Get a group by slug." })
  @ApiParam({
    name: "slug",
    description: "Should be an slug of a group that exists in the database.",
    type: String,
    required: true,
  })
  @ApiOkResponse({
    description: "Record has been retrieved successfully.",
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: "Data not found",
  })
  @ApiProduces("application/json")
  async getGroup(@Param("slug") slug: string, @Req() req) {
    const { group, groupUsers } = await this.groupsService.getGroupBySlug(slug)

    // check if the user is the owner of the group
    let isOwner = false,
      isMember = false
    for (let i = 0; i < groupUsers.length; ++i) {
      const user = groupUsers[i]
      if (user.userId === req.user.id) {
        isMember = true
        if (user.role === GroupRole.ADMIN) {
          isOwner = true
        }
      }
    }

    if (!isMember) delete group.accessCode

    // return response
    return {
      body: {
        group,
        isOwner,
        isMember,
        users: groupUsers,
      },
    }
  }

  @Post("/:id/members")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new member in a group" })
  @ApiParam({
    name: "id",
    description: "Should be Id of a group that exists in the database.",
    type: Number,
    required: true,
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: AddUserToGroupDto,
    description: "Record has been created successfully.",
  })
  @ApiBody({
    type: AddUserToGroupDto,
    description: "Data to create a new record.",
    required: true,
  })
  @ApiBadRequestResponse({
    description: "Bad Request.",
  })
  @ApiConsumes("application/json")
  @ApiProduces("application/json")
  async addUser(@Param() params, @Body() body: AddUserToGroupDto, @Req() req) {
    const usernames = body.username.split("\n").filter((el) => el.length > 0)

    // check if user is allowed to add members
    const groupOwner = await this.groupsService.isGroupOwner(Number(params.id), req.user.id)
    if (!groupOwner) {
      throw new ForbiddenException("You are not allowed!")
    }

    // add the user
    const { failed } = await this.groupsService.addUsersToGroup(Number(params.id), usernames)
    return {
      statusCode: HttpStatus.CREATED,
      message: `${usernames.length - failed.length} Members added!`,
      body: {
        failed,
      },
    }
  }

  @Delete("/:id/members/:userId")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a group member." })
  @ApiParam({
    name: "id",
    description: "Should be Id of a group that exists in the database.",
    type: Number,
    required: true,
  })
  @ApiParam({
    name: "userId",
    description: "Should be userId that exists in the database.",
    type: Number,
    required: true,
  })
  @ApiNoContentResponse({
    description: "Record has been deleted successfully.",
  })
  @ApiNotFoundResponse({
    description: "No data found.",
  })
  async removeUser(@Param() params) {
    const { id: groupId, userId } = params
    // remove the user
    await this.groupsService.removeUserFromGroup(Number(groupId), Number(userId))
    return {
      statusCode: HttpStatus.OK,
      message: "Member removed!",
    }
  }

  @Get("/:slug/lists")
  async getProblemLists(@Param("slug") slug: string) {
    const lists = await this.groupsService.getLists(slug)
    return {
      statusCode: HttpStatus.OK,
      lists,
    }
  }
}
