import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { ActiveUserData } from "~/modules/auth/decorators/user.decorator";

import { Role } from "../../auth/enums/role.enum";

@Injectable()
export class UserAccessGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: ActiveUserData = request.user;
    if (user.role === Role.Admin) {
      return true;
    }
    if (user.username === request.params.username) {
      return true;
    }
    return false;
  }
}
