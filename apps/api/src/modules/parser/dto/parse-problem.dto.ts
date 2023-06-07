import { ApiProperty } from "@nestjs/swagger";
import { IsUrl } from "class-validator";

export class ParseProblemDto {
  @ApiProperty({
    description: "Problem URL",
    example: "https://codeforces.com/problemset/problem/1839/E"
  })
  @IsUrl()
  url: string;
}
