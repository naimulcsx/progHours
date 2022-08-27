import { Module } from "@nestjs/common"
import { UsersModule } from "../users/users.module"
import { GroupsController } from "./groups.controller"
import { GroupsService } from "./groups.service"

@Module({
  imports: [UsersModule],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
