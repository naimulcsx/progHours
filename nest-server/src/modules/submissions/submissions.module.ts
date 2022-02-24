import { Module } from '@nestjs/common';
import { ParsersModule } from '../parsers/parsers.module';
import { ProblemsModule } from '../problems/problems.module';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';

@Module({
  imports: [ProblemsModule, ParsersModule],
  controllers: [SubmissionsController],
  providers: [SubmissionsService],
})
export class SubmissionsModule {}
