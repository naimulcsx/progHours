import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { InstitutionsService } from "../providers/institutions.service";

@Controller("/institutions")
@ApiTags("Institutions")
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @Get("/")
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Get all institutions" })
  async getInstitutions() {
    return this.institutionsService.getInstitutes();
  }
}
