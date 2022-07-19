import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ParsersModule } from "@/modules/parsers/parsers.module"
import { Submission } from "@/modules/submissions/submission.entity"
import { SubmissionsController } from "@/modules/submissions/submissions.controller"
import { SubmissionsService } from "@/modules/submissions/submissions.service"
import { SubmissionsSubscriber } from "./submissions.subscriber"

@Module({
  imports: [ParsersModule, TypeOrmModule.forFeature([Submission])],
  controllers: [SubmissionsController],
  providers: [SubmissionsService, SubmissionsSubscriber],
  exports: [SubmissionsService],
})
export class SubmissionsModule {}
