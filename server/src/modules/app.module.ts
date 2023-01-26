import { CacheModule, Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from "./auth/auth.module"
import { SubmissionsModule } from "./submissions/submissions.module"
import { ProblemsModule } from "./problems/problems.module"
import { ParsersModule } from "./parsers/parsers.module"
import { HttpModule } from "@nestjs/axios"
import { UsersModule } from "./users/users.module"
import { HandlesModule } from "./handles/handles.module"
import { StatsModule } from "./stats/stats.module"
import { PrismaModule } from "./prisma/prisma.module"
import { StudiesModule } from "./studies/studies.module"
import { GroupsModule } from "./groups/groups.module"
import { TagsModule } from "./tags/tags.module"
import { ListsModule } from './lists/lists.module';

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
    TagsModule,
    ListsModule,
  ],
})
export class AppModule {}
