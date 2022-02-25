import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParsersModule } from '../parsers/parsers.module';
import { ProblemsModule } from '../problems/problems.module';
import { Submission } from './submission.entity';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';

@Module({
  imports: [
    ProblemsModule,
    ParsersModule,
    TypeOrmModule.forFeature([Submission]),
  ],
  controllers: [SubmissionsController],
  providers: [SubmissionsService],
})
export class SubmissionsModule {}
