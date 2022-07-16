import { Module } from "@nestjs/common"
import { UserStudyController } from "./user-study.controller"
import { UserStudyService } from "./user-study.service"

@Module({
  controllers: [UserStudyController],
  providers: [UserStudyService],
  exports: [UserStudyService],
})
export class UserStudyModule {}
