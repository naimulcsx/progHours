import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { HandlesController } from "./handles.controller"
import { Handle } from "./handles.entity"
import { HandlesService } from "./handles.service"

@Module({
  imports: [TypeOrmModule.forFeature([Handle])],
  controllers: [HandlesController],
  providers: [HandlesService],
})
export class HandlesModule {}
