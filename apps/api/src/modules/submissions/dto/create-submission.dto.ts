import { IsString, IsNumber, IsUrl, IsISO8601 } from "class-validator";
import { Verdict } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSubmissionDto {
  @ApiProperty({
    description: "Problem URL",
    example: "https://codeforces.com/problemset/problem/1839/E"
  })
  @IsUrl()
  url: string;

  @ApiProperty({
    description: "Solve time",
    example: "40"
  })
  @IsNumber()
  solveTime: number;

  @ApiProperty({
    description: "Verdict",
    example: "AC"
  })
  @IsString()
  verdict: Verdict;

  @ApiProperty({
    description: "Solved at",
    example: "2023-05-23"
  })
  @IsISO8601()
  solvedAt: string;
}
