import { IsNumber, IsString } from "class-validator"

export class ProblemDto {
  @IsString()
  pid: string

  @IsString()
  name: string

  @IsString()
  link: string

  @IsNumber()
  difficulty: number

  @IsNumber()
  onlineJudgeId: number
}
