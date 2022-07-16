import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common"
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger"
import { IsAuthenticatedGuard } from "src/guards/is-authenticated"
import { CreateHandleDto } from "src/validators/create-handle-dto"
import { HandlesService } from "./handles.service"

@Controller("handles")
@ApiTags("Online Judge Handle")
@UseGuards(IsAuthenticatedGuard)
export class HandlesController {
  constructor(private readonly handleService: HandlesService) {}

  @Post("")
  @ApiOperation({ summary: "Create a online judge handle" })
  @ApiCreatedResponse({ description: "Handle successfully created" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async createOJHandles(@Body() body: CreateHandleDto, @Req() req: any) {
    const { handle, onlineJudgeId } = body

    const foundHandle = await this.handleService.findHandle({
      userId: req.user.id,
      onlineJudgeId,
    })
    if (foundHandle) throw new BadRequestException("handle already exists")

    const newHandle = await this.handleService.createHandles({
      handle,
      onlineJudgeId,
      userId: req.user.id,
    })

    return { statusCode: HttpStatus.CREATED, body: { handles: newHandle } }
  }

  @ApiOperation({ summary: "Find OJ handles" })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @Get("")
  async findHandles(@Req() req) {
    const handles = await this.handleService.findAllHandles(req.user.id)
    return { statusCode: HttpStatus.OK, body: { handles } }
  }

  @ApiOperation({ summary: "Delete a OJ handle" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @Delete("")
  async deleteHandle(@Req() req, @Body() body) {
    await this.handleService.deleteHandle(req.user.id, body.onlineJudgeId)

    return { statusCode: HttpStatus.OK, message: "Handle deleted" }
  }

  @ApiOperation({ summary: "Update a OJ handle" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @Patch("")
  async updateHandle(@Req() req, @Body() body) {
    const { handle, onlineJudgeId } = body
    await this.handleService.updateHandle(req.user.id, onlineJudgeId, handle)

    return { statusCode: HttpStatus.OK, message: "Handle Updated" }
  }
}
