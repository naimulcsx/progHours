import { Module } from "@nestjs/common";

import { InstitutionsController } from "./controllers/institutions.controller";
import { InstitutionsRepository } from "./providers/institutions.repository";
import { InstitutionsService } from "./providers/institutions.service";

@Module({
  controllers: [InstitutionsController],
  providers: [InstitutionsService, InstitutionsRepository]
})
export class InstitutionsModule {}
