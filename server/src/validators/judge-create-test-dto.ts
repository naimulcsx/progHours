import {
  IsEmail,
  IsString,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
  Max,
  IsNotEmpty,
  IsBoolean,
} from "class-validator"

export class JudgeProblemTestDto {
  @IsString()
  @IsOptional()
  weight: number

  @IsString()
  @IsOptional()
  label: string

  @IsString()
  @IsOptional()
  input: string

  @IsString()
  @IsOptional()
  output: string
}