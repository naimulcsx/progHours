import { Injectable } from "@nestjs/common";
import { PrismaService } from "~/modules/prisma/services/prisma.service";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
}
