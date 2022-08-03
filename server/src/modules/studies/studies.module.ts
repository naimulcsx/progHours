import { Module } from "@nestjs/common"
import { StudiesController } from "./studies.controller"
import { StudiesService } from "./studies.service"

@Module({
  controllers: [StudiesController],
  providers: [StudiesService],
  exports: [StudiesService],
})
export class StudiesModule {}
