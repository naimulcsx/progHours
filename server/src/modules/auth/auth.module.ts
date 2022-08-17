import { TypeOrmModule } from "@nestjs/typeorm"
import { forwardRef, Module } from "@nestjs/common"

/**
 * Import Controllers
 */
import { AuthController } from "@/modules/auth/auth.controller"

/**
 * Import Services
 */
import { AuthService } from "@/modules/auth/auth.service"

/**
 * Imoport Modules
 */
import { UsersModule } from "@/modules/users/users.module"

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
