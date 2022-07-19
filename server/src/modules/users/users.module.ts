import { forwardRef, Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

/**
 * Import Entities (models)
 */
import { User } from "@/modules/users/user.entity"
import { Submission } from "@/modules/submissions/submission.entity"
import { Ranking } from "@/modules/ranking/ranking.entity"

/**
 * Import Controllers
 */
import { UsersController } from "@/modules/users/users.controller"

/**
 * Import Services
 */
import { UsersService } from "@/modules/users/users.service"
import { AuthModule } from "../auth/auth.module"
import { OnlineJudgesModule } from "../online-judges/online-judges.module"
import { SubmissionsModule } from "../submissions/submissions.module"
import { UserStudyModule } from "../user-study/user-study.module"

@Module({
  imports: [
    SubmissionsModule,
    UserStudyModule,
    OnlineJudgesModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, Submission, Ranking]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
