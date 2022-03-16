import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Problem } from "./problem.entity"
import { ProblemsController } from "./problems.controller"
import { ProblemsService } from "./problems.service"
import { Tag } from "./tag.entity"
import { UserProblemTag } from "./user-problem-tag"

@Module({
  imports: [TypeOrmModule.forFeature([Problem, Tag, UserProblemTag])],
  controllers: [ProblemsController],
  providers: [ProblemsService],
  exports: [ProblemsService],
})
export class ProblemsModule {}
