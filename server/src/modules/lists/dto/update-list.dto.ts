import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, MinLength } from "class-validator"

export class UpdateListDto {
  @ApiProperty({ type: String })
  @IsString()
  name: string
}
