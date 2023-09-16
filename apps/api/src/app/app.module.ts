import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import { redisStore } from "cache-manager-redis-yet";
import Joi from "joi";

import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import appConfig from "~/config/app.config";
import jwtConfig from "~/config/jwt.config";

import { AuthModule } from "~/modules/auth/auth.module";
import { LeaderboardModule } from "~/modules/leaderboard/leaderboard.module";
import { ParserModule } from "~/modules/parser/parser.module";
import { PrismaModule } from "~/modules/prisma/prisma.module";
import { ProblemsModule } from "~/modules/problems/problems.module";
import { ProfilesModule } from "~/modules/profiles/profiles.module";
import { PrometheusController } from "~/modules/prometheus/controllers/prometheus.controller";
import { SubmissionsModule } from "~/modules/submissions/submissions.module";
import { TrackerModule } from "~/modules/tracker/tracker.module";
import { UsersModule } from "~/modules/users/users.module";

@Module({
  imports: [
    PrometheusModule.register({
      controller: PrometheusController
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, jwtConfig],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid("development", "production"),
        PORT: Joi.number(),
        TZ: Joi.string(),
        JWT_SECRET: Joi.string().required()
      })
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: "localhost",
            port: 6379
          }
        })
      })
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ProfilesModule,
    ProblemsModule,
    SubmissionsModule,
    ParserModule,
    LeaderboardModule,
    TrackerModule.register()
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
