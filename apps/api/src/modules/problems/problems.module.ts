import { Module } from "@nestjs/common";
import { ProblemsService } from "./services/problems.service";
import { ProblemsController } from "./controllers/problems.controller";
import { ParserModule } from "../parser/parser.module";

@Module({
  imports: [ParserModule],
  exports: [ProblemsService],
  controllers: [ProblemsController],
  providers: [ProblemsService]
})
export class ProblemsModule {}
