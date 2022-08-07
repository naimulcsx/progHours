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
import { AuthModule } from "@/modules/auth/auth.module"
import { OnlineJudgesModule } from "@/modules/online-judges/online-judges.module"
import { SubmissionsModule } from "@/modules/submissions/submissions.module"
import { StudiesModule } from "@/modules/studies/studies.module"

@Module({
  imports: [
    SubmissionsModule,
    StudiesModule,
    OnlineJudgesModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, Submission, Ranking]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
