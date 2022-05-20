import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ResourcesController } from "./resources.controller"
import { Resource } from "./resources.entity"
import { ResourcesService } from "./resources.service"

@Module({
  imports: [TypeOrmModule.forFeature([Resource])],
  controllers: [ResourcesController],
  providers: [ResourcesService],
})
export class ResourcesModule {}
