import { IsDateString, IsNumber, IsString, IsOptional } from "class-validator"

export class UpdateStudyDto {
  @IsString()
  @IsOptional()
  title: string

  @IsString()
  @IsOptional()
  type: string

  @IsDateString()
  @IsOptional()
  studyDate: Date

  @IsNumber()
  @IsOptional()
  studyTime: number

  @IsString()
  @IsOptional()
  link: string

  @IsString()
  @IsOptional()
  difficulty: string

  @IsString()
  @IsOptional()
  language: string
}
