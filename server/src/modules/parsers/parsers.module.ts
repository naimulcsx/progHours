import { Module } from "@nestjs/common"
import { HttpModule } from "@nestjs/axios"

/**
 * Import Services
 */
import { ParsersService } from "@/modules/parsers/parsers.service"

@Module({
  imports: [HttpModule],
  providers: [ParsersService],
  exports: [ParsersService],
})
export class ParsersModule {}
