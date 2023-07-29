import { Module } from "@nestjs/common";
import { StatisticsService } from "./services/statistics.service";

@Module({
  providers: [StatisticsService],
  exports: [StatisticsService]
})
export class StatisticsModule {}
