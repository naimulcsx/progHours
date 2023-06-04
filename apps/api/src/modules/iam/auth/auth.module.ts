import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { HashingService } from "./hashing/hashing.service";
import { BcryptService } from "./hashing/bcrypt.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AccessTokenGuard } from "./guards/access-token.guard";
import { AuthenticationGuard } from "./guards/authentication.guard";
import { RolesGuard } from "./guards/roles.guard";
import jwtConfig from "./config/jwt.config";

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig)
  ],
  providers: [
    { provide: HashingService, useClass: BcryptService },
    /**
     * Global access token and roles guard that applies to all routes
     * Learn more: https://docs.nestjs.com/guards#binding-guards
     */
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    AccessTokenGuard,
    AuthService
  ],
  controllers: [AuthController],
  exports: [{ provide: HashingService, useClass: BcryptService }]
})
export class AuthModule {}
