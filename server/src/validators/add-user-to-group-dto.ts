import { Matches, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class AddUserToGroupDto {
  @ApiProperty({
    description: "Username of the user",
    example: "C181065",
    pattern: "^[cC][0-9]{6}$",
  })
  // @Matches(/^[cC][0-9]{6}$/, { message: "Invalid UID" })
  username: string
}
