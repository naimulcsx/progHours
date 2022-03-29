import { IsString, IsNumber, IsDateString } from "class-validator"

export class CreateSubmissionDto {
  @IsString()
  link: string

  @IsNumber()
  solve_time: number

  @IsString()
  verdict: string

  @IsDateString()
  solved_at: Date
}
