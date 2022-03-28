import { IsEmail, IsString, MinLength } from "class-validator"

export class UpdateUserDto {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsString()
  currentPassword: string

  @IsString()
  newPassword: string

  @IsString()
  confirmPassword: string
}
