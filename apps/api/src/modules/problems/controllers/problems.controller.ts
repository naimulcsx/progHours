import { Body, Controller, Post } from "@nestjs/common";
import { CreateProblemDto } from "../dto/create-problem.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ProblemsService } from "../services/problems.service";
import { Roles } from "~/modules/iam/auth/decorators/roles.decorator";
import { Role } from "~/modules/iam/auth/enums/role.enum";

@Controller("problems")
@ApiTags("Problems")
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Create new problem" })
  async createProblem(@Body() createProblemDto: CreateProblemDto) {
    return this.problemsService.createProblem(createProblemDto);
  }
}
