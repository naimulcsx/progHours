import { BadRequestException, Injectable } from "@nestjs/common";
import { OJProblemParser } from "@proghours/oj-problem-parser";
import { ParseProblemDto } from "../dto/parse-problem.dto";

@Injectable()
export class ParserService {
  private problemParser: OJProblemParser;
  constructor() {
    this.problemParser = new OJProblemParser();
  }
  async parse(parseProblemDto: ParseProblemDto) {
    try {
      const data = await this.problemParser.parse(parseProblemDto.url);
      return data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }
}
