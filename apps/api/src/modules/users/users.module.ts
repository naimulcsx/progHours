import { Module, forwardRef } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { UsersController } from "./controllers/users.controller";
import { UsersRepository } from "./providers/users.repository";
import { UsersService } from "./providers/users.service";

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule {}
