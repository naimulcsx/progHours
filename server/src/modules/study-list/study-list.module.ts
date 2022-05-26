import { Module } from "@nestjs/common"
import { StudyListService } from "./study-list.service"
import { StudyListController } from "./study-list.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { StudyList } from "./study-list.entity"

@Module({
  imports: [TypeOrmModule.forFeature([StudyList])],
  providers: [StudyListService],
  controllers: [StudyListController],
})
export class StudyListModule {}
