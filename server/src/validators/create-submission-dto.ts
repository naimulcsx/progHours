import { IsString, IsNumber, IsDateString } from "class-validator"
import { Verdict } from "@prisma/client"

export class CreateSubmissionDto {
  @IsString()
  link: string

  @IsNumber()
  solveTime: number

  @IsString()
  verdict: Verdict

  @IsDateString()
  solvedAt: Date
}
