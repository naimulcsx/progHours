import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common"
import { IsAuthenticatedGuard } from "src/guards/is-authenticated"
import { CreateHandleDto } from "src/validators/create-handle-dto"
import { HandlesService } from "./handles.service"

@Controller("handles")
@UseGuards(IsAuthenticatedGuard)
export class HandlesController {
  constructor(private readonly handleService: HandlesService) {}

  @Post("")
  async createOJHandles(@Body() body: CreateHandleDto, @Req() req: any) {
    const { handle, judge_id } = body

    const foundHandle = await this.handleService.findHandle({
      user_id: req.user.id,
      judge_id,
    })
    if (foundHandle) throw new BadRequestException("handle already exists")

    const newHandle = await this.handleService.createHandles({
      handle,
      judge_id,
      user_id: req.user.id,
    })

    return { newHandle }
  }

  @Get("")
  async findHandles(@Req() req) {
    const handles = await this.handleService.findAllHandles(req.user.id)
    return { handles }
  }

  @Delete("")
  async deleteHandle(@Req() req, @Body() body) {
    await this.handleService.deleteHandle(req.user.id, body.judge_id)
    return { status: "success", message: "Handle deleted" }
  }
}
