import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

/**
 * Import Entities (models)
 */
import { Tag } from "@/modules/problems/tag.entity"
import { Problem } from "@/modules/problems/problem.entity"
import { UserProblemTag } from "@/modules/problems/user-problem-tag"

/**
 * Import Controllers
 */
import { ProblemsController } from "@/modules/problems/problems.controller"

/**
 * Import Services
 */
import { ProblemsService } from "@/modules/problems/problems.service"

@Module({
  imports: [TypeOrmModule.forFeature([Problem, Tag, UserProblemTag])],
  controllers: [ProblemsController],
  providers: [ProblemsService],
  exports: [ProblemsService],
})
export class ProblemsModule {}
