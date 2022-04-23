import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Ranking } from "./ranking.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Ranking])],
  providers: [],
})
export class RankingModule {}
