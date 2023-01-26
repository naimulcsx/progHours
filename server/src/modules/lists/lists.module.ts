import { Module } from "@nestjs/common"
import { ListsService } from "./lists.service"
import { ListsController } from "./lists.controller"
import { ParsersModule } from "../parsers/parsers.module"
import { GroupsService } from "../groups/groups.service"

@Module({
  imports: [ParsersModule],
  controllers: [ListsController],
  providers: [ListsService, GroupsService],
})
export class ListsModule {}
