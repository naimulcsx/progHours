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
import { OnlineJudges } from "./online-judges/online-judges.entity"
import { HandlesModule } from "./handles/handles.module"
import { Handle } from "./handles/handles.entity"
import { UserProblemTag } from "./problems/user-problem-tag"

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
        OnlineJudges,
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
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
