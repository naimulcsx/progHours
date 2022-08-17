import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

/**
 * Import Controllers
 */
import { ProblemsController } from "@/modules/problems/problems.controller"

/**
 * Import Services
 */
import { ProblemsService } from "@/modules/problems/problems.service"
import { ParsersModule } from "../parsers/parsers.module"

@Module({
  imports: [ParsersModule],
  controllers: [ProblemsController],
  providers: [ProblemsService],
  exports: [ProblemsService],
})
export class ProblemsModule {}
