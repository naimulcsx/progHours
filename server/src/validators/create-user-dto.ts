import { Matches, IsString, IsEmail, MinLength } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
  @ApiProperty({
    description: "Full name of the user",
    example: "Naimul Haque",
  })
  @IsString()
  name: string

  @ApiProperty({
    description: "Username of the user",
    example: "C181065",
    pattern: "^[C][0-9]{6}$",
  })
  @Matches(/^[C][0-9]{6}$/, { message: "invalid uid" })
  username: string

  @ApiProperty({
    description: "Email of the user",
    example: "naimulcsx@gmail.com",
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: "Password of the user",
    example: "YQ3jwr6ycN",
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string
}
