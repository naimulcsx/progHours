import { Matches, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class LoginUserDto {
  @ApiProperty({
    description: "Username of the user",
    example: "C181065",
    pattern: "^[C][0-9]{6}$",
  })
  @Matches(/^[C][0-9]{6}$/, { message: "invalid uid" })
  username: string

  @ApiProperty({
    description: "Password of the user",
    example: "YQ3jwr6ycN",
  })
  @IsString()
  password: string
}
