import { Module } from "@nestjs/common";
import { ParserService } from "./services/parser.service";
import { ParserController } from "./controllers/parser.controller";

@Module({
  controllers: [ParserController],
  providers: [ParserService],
  exports: [ParserService]
})
export class ParserModule {}
