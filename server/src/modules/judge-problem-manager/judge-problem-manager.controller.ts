import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common"

import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger"

import { JudgeProblemManagerService } from './judge-problem-manager.service';
import { JudgeProblmeDto } from "@/validators/judge-create-problem-dto";
import { JudgeProblemTestDto } from "@/validators/judge-create-test-dto";

@Controller('p')
export class JudgeProblemManagerController {
  constructor(private readonly judgeProblemManagerService: JudgeProblemManagerService) {}

  @Get('/')
  async getAllProblem() {
    return await this.judgeProblemManagerService.getAllProblem()
  }

  @Get('/:pid')
  async getProblem(@Param() params) {
    return this.judgeProblemManagerService.findProblemById(params.pid)
  }

  @Post('/c')
  async createProblem(@Body() body: JudgeProblmeDto) {
    return await this.judgeProblemManagerService.createProblem(body)
  }

  @Post('/:pid/u')
  async updateProblem(@Body() body) {
    
  }

  @Get('/:pid/tests')
  async getTests(@Param() params) {
    return await this.judgeProblemManagerService.getAllTestByProblemId(params.pid)
  }

  @Post('/:pid/tests/c')
  async createTest(@Param() params, @Body() body: JudgeProblemTestDto) {
    return await this.judgeProblemManagerService.createProblemTest(params.pid, body);
  }
}
