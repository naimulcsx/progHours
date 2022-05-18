import { Module } from "@nestjs/common"
import { HttpModule } from "@nestjs/axios"

/**
 * Import Services
 */
import { ParsersService } from "@/modules/parsers/parsers.service"
import { ParsersController } from './parsers.controller';

@Module({
  imports: [HttpModule],
  providers: [ParsersService],
  exports: [ParsersService],
  controllers: [ParsersController],
})
export class ParsersModule {}
