import { IsEmail, IsString } from "class-validator"

export class UpdateUserDto {
  @IsString()
  name: string

  @IsEmail()
  email: string
}
