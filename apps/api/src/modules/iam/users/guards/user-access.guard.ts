import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { ActiveUserData } from "~/modules/iam/auth/decorators/user.decorator";
import { PrismaService } from "~/modules/prisma/services/prisma.service";

import { Role } from "../../auth/enums/role.enum";

@Injectable()
export class UserAccessGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

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
