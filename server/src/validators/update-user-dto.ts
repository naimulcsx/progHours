import { IsEmail, IsString, MinLength } from "class-validator"

export class UpdateUserDto {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  currentPassword: string

  @IsString()
  @MinLength(8)
  newPassword: string

  @IsString()
  @MinLength(8)
  confirmPassword: string
}
