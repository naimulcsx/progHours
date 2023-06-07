import { Body, Controller, Post } from "@nestjs/common";
import { ParseProblemDto } from "../dto/parse-problem.dto";
import { ParserService } from "../services/parser.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Auth, AuthType } from "~/modules/iam/auth/decorators/auth.decorator";

@ApiTags("Parser")
@Controller("parser")
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

  @Post("parse")
  @Auth(AuthType.None)
  @ApiOperation({ summary: "Parse problem" })
  // TODO: make it only accessible for the admin
  async parseProblem(@Body() parseProblemDto: ParseProblemDto) {
    return this.parserService.parse(parseProblemDto);
  }
}
