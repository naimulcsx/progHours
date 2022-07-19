import { IsEmail, IsString, IsNumber, IsOptional } from "class-validator"

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string

  @IsEmail()
  @IsOptional()
  email: string

  @IsNumber()
  @IsOptional()
  batch: string

  @IsNumber()
  @IsOptional()
  cgpa: string

  @IsString()
  @IsOptional()
  department: string

  @IsNumber()
  @IsOptional()
  mobile: string
}
