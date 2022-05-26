import { Module } from "@nestjs/common"
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
import { ResourcesService } from "./resources/resources.service"
import { ResourcesController } from "./resources/resources.controller"
import { ResourcesModule } from "./resources/resources.module"
import { Resource } from "./resources/resources.entity"
import { StudyListModule } from './study-list/study-list.module';

@Module({
  imports: [
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
        Resource,
      ],
      synchronize: true,
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
    ResourcesModule,
    StudyListModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
