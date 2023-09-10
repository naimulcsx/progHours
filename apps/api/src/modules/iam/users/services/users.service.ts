import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";

import { PrismaService } from "~/modules/prisma/services/prisma.service";

import { HashingService } from "../../auth/hashing/hashing.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateHandlesDto } from "../dto/update-handles.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

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
    return this.prisma.user.findMany();
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

  async updateUserHandles(
    username: string,
    updateHandlesDto: UpdateHandlesDto
  ) {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) {
      throw new NotFoundException();
    }
    await this.prisma.userHandle.deleteMany({ where: { userId: user.id } });
    const result = await this.prisma.userHandle.createMany({
      data: updateHandlesDto.handles
        .filter((el) => el.handle.length > 0)
        .map((el) => ({
          ...el,
          userId: user.id
        }))
    });
    return result;
  }
}
