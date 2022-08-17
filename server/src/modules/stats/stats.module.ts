import { Module } from "@nestjs/common"
import { StatsController } from "./stats.controller"
import { StatsService } from "./stats.service"
import { UsersModule } from "@/modules/users/users.module"

@Module({
  imports: [UsersModule],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
