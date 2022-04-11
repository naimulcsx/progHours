import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Submission } from "@/modules/submissions/submission.entity"
import { StatsController } from "./stats.controller"
import { StatsService } from "./stats.service"

@Module({
  imports: [TypeOrmModule.forFeature([Submission])],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}