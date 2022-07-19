import { IsNumber, IsString } from "class-validator"

export class CreateHandleDto {
  @IsString()
  handle: string

  @IsNumber()
  onlineJudgeId: number
}
