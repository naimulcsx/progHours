import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { ActiveUserController } from "./controllers/active-user.controller";
import { UsersController } from "./controllers/users.controller";
import { UsersService } from "./services/users.service";

@Module({
  imports: [AuthModule],
  controllers: [ActiveUserController, UsersController],
  providers: [UsersService]
})
export class UsersModule {}
