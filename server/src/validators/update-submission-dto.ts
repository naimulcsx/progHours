import { IsString, IsNumber, IsDateString, IsOptional } from "class-validator"

export class UpdateSubmissionDto {
  @IsNumber()
  @IsOptional()
  solve_time: number

  @IsString()
  @IsOptional()
  verdict: string

  @IsDateString()
  @IsOptional()
  solved_at: Date
}
