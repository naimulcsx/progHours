import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Observable } from "rxjs"
import * as jwt from "jsonwebtoken"
import { Role } from "@prisma/client"

@Injectable()
export class IsAdmin implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    const { user } = req
    console.log(user.role)
    if (user.role === Role.ADMIN) return true
    return false
  }
}
