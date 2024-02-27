import { User } from "@prisma/client";

import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "~/modules/users/providers/users.service";

import { SignInDto } from "../dto/sign-in.dto";
import { SignUpDto } from "../dto/sign-up.dto";
import { HashingService } from "../hashing/hashing.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async signUp({
    invitationCode,
    ...signUpDto
  }: SignUpDto): Promise<Omit<User, "password">> {
    const validCodes = process.env.INVITATION_CODES.split(",");

    if (!validCodes.includes(invitationCode)) {
      throw new BadRequestException("Invalid invitation code!");
    }

    try {
      const user = await this.usersService.createUser({
        ...signUpDto,
        username: signUpDto.username.toLowerCase()
      });
      delete user.password;
      return user;
    } catch (error) {
      const duplicateKeyErrorCode = "P2002";
      if (error.code === duplicateKeyErrorCode) {
        throw new ConflictException();
      }
      throw new InternalServerErrorException();
    }
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.getUser(
      signInDto.username.toLowerCase()
    );
    if (!user) {
      throw new UnauthorizedException("Invalid UID or password");
    }
    const isEqual = await this.hashingService.compare(
      signInDto.password,
      user.password
    );
    console.log(signInDto.password, user.password, "wrong password");

    if (!isEqual) {
      throw new UnauthorizedException("Invalid UID or password");
    }
    const tokens = await this.generateTokens(user);
    return tokens;
  }

  private async signToken<T>(userId: string, expiresIn: number, payload?: T) {
    return this.jwtService.signAsync(
      {
        sub: userId,
        ...payload
      },
      {
        expiresIn
      }
    );
  }

  async generateTokens(user: User) {
    const [accessToken] = await Promise.all([
      await this.signToken(
        user.id,
        this.configService.get<number>("jwt.accessTokenTtl"),
        {
          username: user.username,
          fullName: user.fullName,
          email: user.email,
          role: user.role
        }
      )
    ]);
    return {
      accessToken
    };
  }
}
