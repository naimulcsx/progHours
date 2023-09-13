import { Module } from "@nestjs/common";

import { ParserModule } from "../parser/parser.module";
import { ProblemsModule } from "../problems/problems.module";
import { SubmissionsController } from "./controllers/submissions.controller";
import { SubmissionsService } from "./services/submissions.service";

@Module({
  imports: [ParserModule, ProblemsModule],
  controllers: [SubmissionsController],
  providers: [SubmissionsService],
  exports: [SubmissionsService]
})
export class SubmissionsModule {}
