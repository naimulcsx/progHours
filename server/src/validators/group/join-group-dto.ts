import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class JoinGroupDto {
  @ApiProperty({ type: String })
  @IsString()
  accessCode: string
}
