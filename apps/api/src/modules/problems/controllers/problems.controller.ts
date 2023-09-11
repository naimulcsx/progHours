import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { Roles } from "~/modules/auth/decorators/roles.decorator";
import { Role } from "~/modules/auth/enums/role.enum";

import { CreateProblemDto } from "../dto/create-problem.dto";
import { ProblemsService } from "../services/problems.service";

@Controller("problems")
@ApiTags("Problems")
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Create new problem" })
  async createProblem(@Body() createProblemDto: CreateProblemDto) {
    return this.problemsService.createProblem(createProblemDto);
  }

  @Get(":id")
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Get problem by Id" })
  async getProblemById(@Param("id", ParseIntPipe) id: number) {
    return this.problemsService.getById(id);
  }

  @Patch(":id/refetch")
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Refetch problem by Id" })
  async refetchProblem(@Param("id", ParseIntPipe) id: number) {
    return this.problemsService.refetchById(id);
  }
}
