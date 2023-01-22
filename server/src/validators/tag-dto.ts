import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class TagDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  id: number

  @ApiProperty({ type: String })
  @IsString()
  name: string
}
