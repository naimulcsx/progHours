import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { PrismaService } from "~/modules/prisma/services/prisma.service";
import { UpdateUserDto } from "../dto/update-user.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import { HashingService } from "../../auth/hashing/hashing.service";

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingService
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hashingService.hash(
      createUserDto.password
    );
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        username: createUserDto.username.toLowerCase()
      }
    });
  }

  async getUsers() {
    // TODO: add pagination and filtering
    return this.prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        username: true,
        phone: true,
        role: true,
        metaData: true,
        createdAt: true
      }
    });
  }

  async getUser(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username: username.toLowerCase() }
    });
    if (!user) {
      throw new NotFoundException();
    }
    delete user.password;
    return user;
  }

  async updateUser(username: string, updateUserDto: UpdateUserDto) {
    username = username.toLowerCase();
    const user = await this.prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      throw new NotFoundException();
    }

    // for password reset
    let hashedPassword = user.password;
    const { currentPassword, newPassword, ...rest } = updateUserDto;
    if (currentPassword && newPassword) {
      const isEqual = await this.hashingService.compare(
        currentPassword,
        user.password
      );
      if (!isEqual) {
        throw new UnauthorizedException("Invalid current password!");
      }
      hashedPassword = await this.hashingService.hash(newPassword);
    }

    const foundUser = await this.prisma.user.update({
      where: { username },
      data: {
        ...rest,
        password: hashedPassword
      }
    });
    delete foundUser.password;
    return foundUser;
  }
}
