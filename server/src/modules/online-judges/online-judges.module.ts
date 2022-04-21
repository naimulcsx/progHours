import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { OnlineJudge } from "./online-judge.entity"
import { OnlineJudgesService } from "./online-judges.service"

@Module({
  imports: [TypeOrmModule.forFeature([OnlineJudge])],
  providers: [OnlineJudgesService],
  exports: [OnlineJudgesService],
})
export class OnlineJudgesModule {}
