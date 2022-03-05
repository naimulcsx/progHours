import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IsAuthenticatedGuard } from 'src/guards/is-authenticated';
import { ProblemsService } from './problems.service';
import e, { Request } from 'express';

@Controller('problems')
@UseGuards(IsAuthenticatedGuard)
export class ProblemsController {
  constructor(private readonly problemService: ProblemsService) {}
  @Post(':id/tags')
  async addTag(@Param('id') id: string, @Req() req) {
    const { body, user } = req;
    const userTag = await this.problemService.findOrCreateUserTag({
      user_id: user.id,
      tag_name: body.tag_name,
    });
    const problemToUpdate = await this.problemService.findOne(id);
    if (!problemToUpdate) {
      throw new BadRequestException(['no problem found']);
    }
    if (problemToUpdate.user_tags) problemToUpdate.user_tags.push(userTag);
    else problemToUpdate.user_tags = [userTag];
    const result = await this.problemService.saveProblem(problemToUpdate);
    // before adding that particular tag, check if the tag is already on the permanent list of tags
    return {
      // created,
      result,
    };
  }
}
