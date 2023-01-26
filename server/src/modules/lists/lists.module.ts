import { Module } from "@nestjs/common"
import { ListsService } from "./lists.service"
import { ListsController } from "./lists.controller"
import { ParsersModule } from "../parsers/parsers.module"

@Module({
  imports: [ParsersModule],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
