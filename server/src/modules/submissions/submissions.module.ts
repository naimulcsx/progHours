import { Module } from "@nestjs/common"
import { ParsersModule } from "@/modules/parsers/parsers.module"
import { SubmissionsController } from "@/modules/submissions/submissions.controller"
import { SubmissionsService } from "@/modules/submissions/submissions.service"

@Module({
  imports: [ParsersModule],
  controllers: [SubmissionsController],
  providers: [SubmissionsService],
  exports: [SubmissionsService],
})
export class SubmissionsModule {}
