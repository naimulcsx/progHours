import { PrismaService } from "@/modules/prisma/prisma.service"
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"

@Injectable()
export class IsGroupAdminGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const userId = request.user.id
    const groupId = request?.body?.groupId

    console.log(userId, request?.body)

    // if there is no groupId in the request body
    if (!groupId) return false

    const groupUser = await this.prisma.userGroup.findFirst({ where: { groupId, userId } })

    // if the user is not group admin
    if (!groupUser || groupUser.role !== "ADMIN") return false

    return true
  }
}
