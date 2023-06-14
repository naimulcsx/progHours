import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import appConfig from "~/config/app.config";
import { PrismaModule } from "~/modules/prisma/prisma.module";
import { AuthModule } from "~/modules/iam/auth/auth.module";
import { UsersModule } from "~/modules/iam/users/users.module";
import { ParserModule } from "~/modules/parser/parser.module";
import { SubmissionsModule } from "~/modules/submissions/submissions.module";
import Joi from "joi";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid("development", "production"),
        PORT: Joi.number(),
        TZ: Joi.string(),
        JWT_SECRET: Joi.string().required()
      })
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    SubmissionsModule,
    ParserModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
