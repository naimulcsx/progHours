import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { ActiveUserController } from "./controllers/active-user.controller";
import { UsersController } from "./controllers/users.controller";
import { UsersRepository } from "./providers/users.repository";
import { UsersService } from "./providers/users.service";

@Module({
  imports: [AuthModule],
  controllers: [ActiveUserController, UsersController],
  providers: [UsersService, UsersRepository]
})
export class UsersModule {}
