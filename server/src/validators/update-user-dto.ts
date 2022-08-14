import { Role } from "@prisma/client"
import {
  IsEmail,
  IsString,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from "class-validator"

export class UpdateUserDto {
  @IsNumber()
  id: number

  @IsString()
  @IsOptional()
  name: string

  @IsString()
  @IsOptional()
  username: string

  @IsEmail()
  @IsOptional()
  email: string

  @IsNumber()
  @IsOptional()
  batch: number

  @IsNumber()
  // @Min(0)
  // @Max(4)
  @IsOptional()
  cgpa: number

  @IsString()
  @IsOptional()
  department: string

  @IsString()
  @IsOptional()
  mobile: string

  @IsString()
  @IsOptional()
  role: Role

  @IsString()
  @IsOptional()
  section: string
}
