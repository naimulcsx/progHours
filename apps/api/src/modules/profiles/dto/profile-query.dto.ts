import { IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class ProfileQueryDto {
  @IsNotEmpty()
  @IsDate()
  @IsOptional()
  from: Date;

  @IsNotEmpty()
  @IsDate()
  @IsOptional()
  to: Date;
}
