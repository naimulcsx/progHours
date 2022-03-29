import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  ValidateIf,
} from "class-validator"

export class UpdateUserDto {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsString()
  @ValidateIf((body) => body.currentPassword.length > 0)
  @MinLength(8)
  currentPassword: string

  @IsString()
  @ValidateIf((body) => body.newPassword.length > 0)
  @MinLength(8)
  newPassword: string

  @IsString()
  @ValidateIf((body) => body.confirmPassword.length > 0)
  @MinLength(8)
  confirmPassword: string
}
