import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class ProblemDto {
  @ApiProperty({ type: String })
  @IsString()
  pid: string

  @ApiProperty({ type: String })
  @IsString()
  name: string

  @ApiProperty({ type: String })
  @IsString()
  link: string

  @ApiProperty({ type: Number })
  @IsNumber()
  difficulty: number

  @ApiProperty({ type: Number })
  @IsNumber()
  onlineJudgeId: number
}
