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
import { JudgeSubmissionManagerService } from './judge-submission-manager.service';

@Controller('s')
export class JudgeSubmissionManagerController {
  constructor(private readonly judgeSubmissionManagerService: JudgeSubmissionManagerService) {}

  @Post('/:pid')
  async submitSolutionToJudge(@Body() body, @Param() params) {
    return await this.judgeSubmissionManagerService.judgeSubmission(body.sourceCode, params.pid, body.language);
  }

  @Post('/sol/:pid')
  async submitSolutionToTest() {
    
  }

  @Get('/:sid/stats')
  async checkSubmissionStats(@Param() params) {
    return await this.judgeSubmissionManagerService.checkStats(params.sid)
  }

}
