import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./services/prisma.service";

@Global()
@Module({
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
