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

export class JudgeProblmeDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsOptional()
  authorName: string

  @IsNumber()
  @IsOptional()
  cpuLimit: number

  @IsNumber()
  @IsOptional()
  memoryLimit: number

  @IsString()
  @IsOptional()
  problemStatement: string

  @IsString()
  @IsOptional()
  inputStatement: string

  @IsString()
  @IsOptional()
  outputStatement: string
  
  @IsString()
  @IsOptional()
  noteStatement: string

  @IsBoolean()
  @IsOptional()
  isVisible: boolean

  @IsString()
  @IsOptional()
  difficulty: string

  @IsString()
  @IsOptional()
  inOutBaseForlder: string

  @IsOptional()
  tags: string[]

  @IsString()
  @IsOptional()
  checkerType: string

  @IsBoolean()
  @IsOptional()
  fold: boolean

  @IsBoolean()
  @IsOptional()
  strictSpace: boolean

  @IsBoolean()
  @IsOptional()
  absolute: boolean

  @IsNumber()
  @IsOptional()
  checkerPrecision: number

  @IsString()
  @IsOptional()
  checkerCustomCode: string

  @IsString()
  @IsOptional()
  type: string

  @IsString()
  @IsOptional()
  editorial: string
}