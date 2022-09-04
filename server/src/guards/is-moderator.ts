import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Observable } from "rxjs"
import { Role } from "@prisma/client"

@Injectable()
export class IsModerator implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    const { user } = req
    if (user.role === Role.MODERATOR) return true
    return false
  }
}
