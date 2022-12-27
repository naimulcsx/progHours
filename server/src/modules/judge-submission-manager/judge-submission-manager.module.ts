import { Module } from '@nestjs/common';
import { JudgeSubmissionManagerService } from './judge-submission-manager.service';
import { JudgeSubmissionManagerController } from './judge-submission-manager.controller';
import { JudgeSubmissionProcessor } from './judge-submission.processor';
import { BullModule } from '@nestjs/bull';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [   
    HttpModule.register({ timeout: 10000 }),
    BullModule.registerQueueAsync({
      name: 'submission-queue',
    }), 
  ],
  controllers: [JudgeSubmissionManagerController],
  providers: [JudgeSubmissionManagerService, JudgeSubmissionProcessor]
})
export class JudgeSubmissionManagerModule {}
