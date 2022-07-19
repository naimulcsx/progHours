import { IsString } from "class-validator"

export class CreateResourceDto {
  @IsString()
  title: string

  @IsString()
  type: string

  @IsString()
  link: string

  @IsString()
  difficulty: string

  @IsString()
  language: string
}
