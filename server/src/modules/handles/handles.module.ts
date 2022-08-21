import { Module } from "@nestjs/common"
import { HandlesController } from "./handles.controller"
import { HandlesService } from "./handles.service"

@Module({
  controllers: [HandlesController],
  providers: [HandlesService],
})
export class HandlesModule {}
