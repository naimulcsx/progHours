import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateProblemDto {
  @ApiProperty({ type: String })
  @IsString()
  pid: string

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  name: string

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  link: string

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  difficulty: number

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  onlineJudgeId: number
}
