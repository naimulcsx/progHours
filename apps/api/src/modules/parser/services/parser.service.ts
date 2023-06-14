import { BadRequestException, Injectable } from "@nestjs/common";
import { OJProblemParser } from "@proghours/oj-problem-parser";

@Injectable()
export class ParserService {
  private problemParser: OJProblemParser;
  constructor() {
    this.problemParser = new OJProblemParser();
  }
  async parse(url: string) {
    try {
      const data = await this.problemParser.parse(url);
      return data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }
}
