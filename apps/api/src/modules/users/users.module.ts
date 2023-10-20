import { Module, forwardRef } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { UsersController } from "./controllers/users.controller";
import { HandlesRepository } from "./providers/handles.repository";
import { UsersRepository } from "./providers/users.repository";
import { UsersService } from "./providers/users.service";

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, HandlesRepository],
  exports: [UsersService]
})
export class UsersModule {}
