import { IsArray, IsString } from "class-validator"

export class AddProblemsDto {
  @IsString()
  links: string

  @IsString()
  name: string
}
