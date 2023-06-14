import { IsString, IsNumber, IsDateString, IsUrl } from "class-validator";
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
    example: new Date().toISOString()
  })
  @IsDateString()
  solvedAt: Date;
}
