import { Module, forwardRef } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";

import { UsersModule } from "../users/users.module";
import { AuthController } from "./controllers/auth.controller";
import { AccessTokenGuard } from "./guards/access-token.guard";
import { AuthenticationGuard } from "./guards/authentication.guard";
import { RolesGuard } from "./guards/roles.guard";
import { BcryptService } from "./hashing/bcrypt.service";
import { HashingService } from "./hashing/hashing.service";
import { AuthService } from "./services/auth.service";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>("jwt.secret"),
          signOptions: {
            expiresIn: configService.get<string>("jwt.accessTokenTtl")
          }
        };
      },
      inject: [ConfigService]
    })
  ],
  providers: [
    { provide: HashingService, useClass: BcryptService },
    /**
     * Global access token and roles guard that applies to all routes
     * Learn more: https://docs.nestjs.com/guards#binding-guards
     */
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    { provide: APP_GUARD, useClass: RolesGuard },

    /**
     * AccessTokenGuard is not directly applied, this is included in the
     * providers list so that we can inject it into the AuthenticationGuard
     */
    AccessTokenGuard,
    AuthService
  ],
  controllers: [AuthController],
  exports: [{ provide: HashingService, useClass: BcryptService }]
})
export class AuthModule {}
