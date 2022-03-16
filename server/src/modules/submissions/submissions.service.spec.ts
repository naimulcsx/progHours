import { Test, TestingModule } from "@nestjs/testing"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ParsersModule } from "../parsers/parsers.module"
import { ProblemsModule } from "../problems/problems.module"
import { Submission } from "./submission.entity"
import { SubmissionsController } from "./submissions.controller"
import { SubmissionsService } from "./submissions.service"

describe("SubmissionsService", () => {
  let service: SubmissionsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmissionsService],
    }).compile()

    service = module.get<SubmissionsService>(SubmissionsService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })
})
