import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateProblemDto {
  @ApiProperty({ type: String, example: "CF-1783F" })
  @IsString()
  pid: string

  @ApiProperty({ type: String, example: "Double Sort II" })
  @IsString()
  @IsOptional()
  name: string

  @ApiProperty({ type: String, example: "https://codeforces.com/contest/1783/problem/F" })
  @IsString()
  @IsOptional()
  link: string

  @ApiProperty({ type: Number, example: 2500 })
  @IsNumber()
  @IsOptional()
  difficulty: number

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  onlineJudgeId: number

  @ApiProperty({ type: Array, example: ["dfs and similar", "flows", "graph matchings", "graphs"] })
  @IsArray()
  @IsOptional()
  tags: string[]
}
