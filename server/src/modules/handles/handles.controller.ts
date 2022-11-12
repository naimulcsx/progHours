import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common"
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { IsAuthenticatedGuard } from "src/guards/is-authenticated"
import { CreateHandleDto } from "src/validators/create-handle-dto"
import { HandlesService } from "./handles.service"

@Controller("handles")
@ApiTags("Online Judge Handle")
export class HandlesController {
  constructor(private readonly handleService: HandlesService) {}

  @Post("")
  @UseGuards(IsAuthenticatedGuard)
  @ApiOperation({ summary: "Create a online judge handle" })
  @ApiCreatedResponse({ description: "Handle successfully created" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async createOJHandles(@Body() body: CreateHandleDto, @Req() req: any) {
    const { handle, onlineJudgeId } = body

    const foundHandle = await this.handleService.findHandle({
      userId: req.user.id,
      onlineJudgeId,
    })
    if (foundHandle) throw new BadRequestException(`You already have a handle for ${foundHandle.onlineJudge.name}.`)

    const newHandle = await this.handleService.createHandles({
      handle,
      onlineJudgeId,
      userId: req.user.id,
    })

    return { statusCode: HttpStatus.CREATED, body: { handles: newHandle } }
  }

  @UseGuards(IsAuthenticatedGuard)
  @ApiOperation({ summary: "Find OJ handles" })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @Get("")
  async findHandles(@Req() req) {
    const handles = await this.handleService.findAllHandles(req.user.id)
    return { statusCode: HttpStatus.OK, body: { handles } }
  }

  @Get("/:username")
  @ApiOperation({ summary: "Get Handles by username" })
  @ApiOkResponse({ description: "Success" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async getHandleByUsername(@Param("username") username: string) {
    const findUser = await this.handleService.getUserByUsername(username)
    if (!findUser) throw new NotFoundException("User not found!")

    const handles = await this.handleService.getHandleByUsername(username)

    return { statusCode: HttpStatus.OK, body: { handles } }
  }

  @Delete("")
  @UseGuards(IsAuthenticatedGuard)
  @ApiOperation({ summary: "Delete a OJ handle" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async deleteHandle(@Req() req, @Body() body) {
    await this.handleService.deleteHandle(req.user.id, body.onlineJudgeId)

    return { statusCode: HttpStatus.OK, message: "Handle deleted" }
  }

  @Patch("")
  @ApiOperation({ summary: "Update a OJ handle" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @UseGuards(IsAuthenticatedGuard)
  async updateHandle(@Req() req, @Body() body) {
    const { handle, onlineJudgeId } = body
    await this.handleService.updateHandle(req.user.id, onlineJudgeId, handle)

    return { statusCode: HttpStatus.OK, message: "Handle Updated" }
  }
}
