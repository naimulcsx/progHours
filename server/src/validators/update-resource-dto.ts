import { IsString, IsOptional } from "class-validator"

export class UpdateResourceDto {
  @IsString()
  @IsOptional()
  title: string

  @IsString()
  @IsOptional()
  type: string

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
