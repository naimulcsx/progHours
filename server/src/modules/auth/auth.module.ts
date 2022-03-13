import { TypeOrmModule } from "@nestjs/typeorm"
import { Module } from "@nestjs/common"

/**
 * Import Controllers
 */
import { AuthController } from "@/modules/auth/auth.controller"

/**
 * Import Services
 */
import { AuthService } from "@/modules/auth/auth.service"

/**
 * Import Entities (models)
 */
import { User } from "@/modules/users/user.entity"

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
