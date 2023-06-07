import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AccessTokenGuard } from "./access-token.guard";
import { AUTH_TYPE_KEY, AuthType } from "../decorators/auth.decorator";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;
  private readonly authTypeGuardMap: Record<AuthType, CanActivate> = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true }
  };

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authType =
      this.reflector.get<AuthType>(AUTH_TYPE_KEY, context.getHandler()) ??
      this.reflector.get<AuthType>(AUTH_TYPE_KEY, context.getClass()) ??
      AuthenticationGuard.defaultAuthType;

    if (await this.authTypeGuardMap[authType].canActivate(context)) {
      return true;
    }

    throw new UnauthorizedException();
  }
}
