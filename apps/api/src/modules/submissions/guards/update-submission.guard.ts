import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";

import { ActiveUserData } from "~/modules/auth/decorators/user.decorator";
import { PrismaService } from "~/modules/prisma/services/prisma.service";

@Injectable()
export class UpdateSubmissionGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const submissionId = request.params.id as string;
    const submission = await this.prisma.submission.findUnique({
      where: { id: submissionId }
    });
    if (!submission) {
      throw new NotFoundException("Submission not found");
    }
    const user: ActiveUserData = request.user;
    if (submission.userId !== user.sub) {
      throw new UnauthorizedException("Unauthorized user");
    }
    return true;
  }
}
