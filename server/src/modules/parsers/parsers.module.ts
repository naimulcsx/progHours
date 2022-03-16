import { Module } from "@nestjs/common"
import { ParsersService } from "./parsers.service"
import { HttpModule } from "@nestjs/axios"

@Module({
  imports: [HttpModule],
  providers: [ParsersService],
  exports: [ParsersService],
})
export class ParsersModule {}
