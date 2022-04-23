import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Submission } from "@/modules/submissions/submission.entity"
import { StatsController } from "./stats.controller"
import { StatsService } from "./stats.service"
import { UsersModule } from "@/modules/users/users.module"
import { Ranking } from "../ranking/ranking.entity"
import { RankingModule } from "../ranking/ranking.module"

@Module({
  imports: [
    UsersModule,
    RankingModule,
    TypeOrmModule.forFeature([Submission, Ranking]),
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
