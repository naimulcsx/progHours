import { CacheModule, Module } from "@nestjs/common"
import { AuthModule } from "./auth/auth.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Connection } from "typeorm"
import { SubmissionsModule } from "./submissions/submissions.module"
import { ProblemsModule } from "./problems/problems.module"
import { ParsersModule } from "./parsers/parsers.module"
import { HttpModule } from "@nestjs/axios"
import { User } from "./users/user.entity"
import { Tag } from "./problems/tag.entity"
import { Problem } from "./problems/problem.entity"
import { Submission } from "./submissions/submission.entity"
import { UsersModule } from "./users/users.module"
import { OnlineJudgesModule } from "./online-judges/online-judges.module"
import { OnlineJudge } from "./online-judges/online-judge.entity"
import { HandlesModule } from "./handles/handles.module"
import { Handle } from "./handles/handles.entity"
import { UserProblemTag } from "./problems/user-problem-tag"
import { StatsModule } from "./stats/stats.module"
import { RankingModule } from "./ranking/ranking.module"
import { Ranking } from "./ranking/ranking.entity"
import { ConfigModule } from "@nestjs/config"
import { PrismaModule } from "./prisma/prisma.module"
import { StudiesModule } from "./studies/studies.module"
import { GroupsModule } from "./groups/groups.module"

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [
        User,
        Tag,
        Problem,
        Submission,
        UserProblemTag,
        Handle,
        OnlineJudge,
        Ranking,
      ],
      // synchronize: true,
    }),
    HttpModule,
    AuthModule,
    SubmissionsModule,
    ProblemsModule,
    ParsersModule,
    UsersModule,
    OnlineJudgesModule,
    HandlesModule,
    StatsModule,
    RankingModule,
    PrismaModule,
    StudiesModule,
    GroupsModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
