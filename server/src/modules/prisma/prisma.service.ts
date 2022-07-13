import {
  BadRequestException,
  INestApplication,
  Injectable,
  OnModuleInit,
} from "@nestjs/common"
import { PrismaClient } from "@prisma/client"

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // Middleware 1
    this.$use(async (params, next) => {
      const result = await next(params)
      // See results here
      return result
    })
    await this.$connect()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close()
    })
  }
}
