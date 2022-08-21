import { forwardRef, Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

/**
 * Import Controllers
 */
import { UsersController } from "@/modules/users/users.controller"

/**
 * Import Services
 */
import { UsersService } from "@/modules/users/users.service"
import { AuthModule } from "@/modules/auth/auth.module"
import { SubmissionsModule } from "@/modules/submissions/submissions.module"
import { StudiesModule } from "@/modules/studies/studies.module"

@Module({
  imports: [SubmissionsModule, StudiesModule, forwardRef(() => AuthModule)],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
