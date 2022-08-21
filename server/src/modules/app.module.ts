import { CacheModule, Module } from "@nestjs/common"
import { AuthModule } from "./auth/auth.module"
import { Connection } from "typeorm"
import { SubmissionsModule } from "./submissions/submissions.module"
import { ProblemsModule } from "./problems/problems.module"
import { ParsersModule } from "./parsers/parsers.module"
import { HttpModule } from "@nestjs/axios"
import { UsersModule } from "./users/users.module"
import { HandlesModule } from "./handles/handles.module"
import { StatsModule } from "./stats/stats.module"
import { ConfigModule } from "@nestjs/config"
import { PrismaModule } from "./prisma/prisma.module"
import { StudiesModule } from "./studies/studies.module"
import { GroupsModule } from "./groups/groups.module"

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    AuthModule,
    SubmissionsModule,
    ProblemsModule,
    ParsersModule,
    UsersModule,
    HandlesModule,
    StatsModule,
    PrismaModule,
    StudiesModule,
    GroupsModule,
  ],
})
export class AppModule {}
