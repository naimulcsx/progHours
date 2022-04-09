import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthModule } from "@/modules/auth/auth.module"
import { ParsersModule } from "@/modules/parsers/parsers.module"
import { ProblemsModule } from "@/modules/problems/problems.module"
import { Submission } from "@/modules/submissions/submission.entity"
import { SubmissionsController } from "@/modules/submissions/submissions.controller"
import { SubmissionsService } from "@/modules/submissions/submissions.service"
import { UsersModule } from "../users/users.module"

@Module({
  imports: [
    ProblemsModule,
    ParsersModule,
    AuthModule,
    UsersModule,
    TypeOrmModule.forFeature([Submission]),
  ],
  controllers: [SubmissionsController],
  providers: [SubmissionsService],
})
export class SubmissionsModule {}
