import { Module } from '@nestjs/common';
import { JudgeProblemManagerService } from './judge-problem-manager.service';
import { JudgeProblemManagerController } from './judge-problem-manager.controller';

@Module({
  controllers: [JudgeProblemManagerController],
  providers: [JudgeProblemManagerService]
})
export class JudgeProblemManagerModule {}
