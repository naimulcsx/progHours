import { IsString, IsUrl, IsNumber, IsDateString } from "class-validator"

export class CreateSubmissionDto {
  @IsUrl()
  link: string

  @IsNumber()
  solve_time: number

  @IsString()
  verdict: string

  @IsDateString()
  solved_at: Date
}
