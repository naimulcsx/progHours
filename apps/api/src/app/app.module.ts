import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import appConfig from "~/config/app.config";
import { PrismaModule } from "~/modules/prisma/prisma.module";
import { AuthModule } from "~/modules/iam/auth/auth.module";
import { UsersModule } from "~/modules/iam/users/users.module";
import { ParserModule } from "~/modules/parser/parser.module";
import { SubmissionsModule } from "~/modules/submissions/submissions.module";
import { ProblemsModule } from "~/modules/problems/problems.module";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import { PrometheusController } from "~/modules/prometheus/controllers/prometheus.controller";
import { TrackerModule } from "~/modules/tracker/tracker.module";
import Joi from "joi";
import { LeaderboardModule } from "~/modules/leaderboard/leaderboard.module";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-yet";

@Module({
  imports: [
    PrometheusModule.register({
      controller: PrometheusController
    }),
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
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          // TODO: need to replace these with config read from env
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
    ProblemsModule,
    SubmissionsModule,
    ParserModule,
    TrackerModule.register(),
    LeaderboardModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
