import { Injectable } from "@nestjs/common";

import { InstitutionsRepository } from "./institutions.repository";

@Injectable()
export class InstitutionsService {
  constructor(
    private readonly institutionsRepository: InstitutionsRepository
  ) {}

  async getInstitutes() {
    return this.institutionsRepository.getAll();
  }
}
