import { User } from "@prisma/client";

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { PrismaService } from "~/modules/prisma/services/prisma.service";

import { SignInDto } from "../dto/sign-in.dto";
import { SignUpDto } from "../dto/sign-up.dto";
import { HashingService } from "../hashing/hashing.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<Omit<User, "password">> {
    try {
      const hashedPassword = await this.hashingService.hash(signUpDto.password);
      const user = await this.prisma.user.create({
        data: {
          ...signUpDto,
          password: hashedPassword,
          username: signUpDto.username.toLowerCase()
        }
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
    const user = await this.prisma.user.findUnique({
      where: {
        username: signInDto.username.toLowerCase()
      }
    });
    if (!user) {
      throw new UnauthorizedException("Invalid UID or password");
    }
    const isEqual = await this.hashingService.compare(
      signInDto.password,
      user.password
    );
    if (!isEqual) {
      throw new UnauthorizedException("Invalid UID or password");
    }
    const tokens = await this.generateTokens(user);
    return tokens;
  }

  private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
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
