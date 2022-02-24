import { Matches, IsString } from 'class-validator';

export class LoginUserDto {
  @Matches(/^[C][0-9]{6}$/, { message: 'invalid uid' })
  username: string;

  @IsString()
  password: string;
}
