import { IsDateString, IsNumber, IsString } from "class-validator"

export class CreateStudyDto {
  @IsString()
  title: string

  @IsString()
  type: string

  @IsDateString()
  studyDate: Date

  @IsNumber()
  studyTime: number

  @IsString()
  link: string

  @IsString()
  difficulty: string

  @IsString()
  language: string
}
