import { IsNumber, IsString, MinLength } from "class-validator"

export class CreateCollectionDto {
  @IsString()
  @MinLength(2)
  name: string
}
