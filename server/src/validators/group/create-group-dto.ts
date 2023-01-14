import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateGroupDto {
  @ApiProperty({ type: String })
  @IsString()
  hashtag: string

  @ApiProperty({ type: String })
  @IsString()
  name: string
}
