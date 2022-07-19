import { IsString, IsNumber, IsDateString, IsOptional } from "class-validator"
import { Verdict } from "@prisma/client"

export class UpdateSubmissionDto {
  @IsNumber()
  @IsOptional()
  solveTime: number

  @IsString()
  @IsOptional()
  verdict: Verdict

  @IsDateString()
  @IsOptional()
  solvedAt: Date
}
