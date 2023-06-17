import { Module } from "@nestjs/common";
import { SubmissionsController } from "./controllers/submissions.controller";
import { SubmissionsService } from "./services/submissions.service";
import { ParserModule } from "../parser/parser.module";
import { ProblemsModule } from "../problems/problems.module";

@Module({
  imports: [ParserModule, ProblemsModule],
  controllers: [SubmissionsController],
  providers: [SubmissionsService]
})
export class SubmissionsModule {}
