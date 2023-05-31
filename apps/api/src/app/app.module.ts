import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import appConfig from "~/config/app.config";
import { PrismaModule } from "~/modules/prisma/prisma.module";
import Joi from "joi";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid("development", "production"),
        PORT: Joi.number()
      })
    }),
    PrismaModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
