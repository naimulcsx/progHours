import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from "@nestjs/common";
import { PrismaService } from "~/modules/prisma/services/prisma.service";
import { HashingService } from "./hashing/hashing.service";
import { JwtService } from "@nestjs/jwt";
import jwtConfig from "./config/jwt.config";
import { ConfigType } from "@nestjs/config";
import { SignUpDto } from "./dto/sign-up.dto";
import { User } from "@prisma/client";
import { SignInDto } from "./dto/sign-in.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
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
        // TODO: add token audience and issuer
        secret: this.jwtConfiguration.secret,
        expiresIn: expiresIn
      }
    );
  }

  async generateTokens(user: User) {
    // TODO: generate refresh token
    const [accessToken] = await Promise.all([
      await this.signToken(user.id, this.jwtConfiguration.accessTokenTtl, {
        username: user.username,
        role: user.role
      })
    ]);
    return {
      accessToken
    };
  }
}
