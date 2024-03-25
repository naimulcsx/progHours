import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";

import { HashingService } from "~/modules/auth/hashing/hashing.service";

import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateHandlesDto } from "../dto/update-handles.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { HandlesRepository } from "./handles.repository";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly usersRepository: UsersRepository,
    private readonly handlesRepository: HandlesRepository
  ) {}

  async getUsers() {
    return this.usersRepository.getAll();
  }

  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hashingService.hash(
      createUserDto.password
    );
    return this.usersRepository.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        username: createUserDto.username.toLowerCase()
      }
    });
  }

  async getUser(username: string) {
    username = username.toLowerCase();
    const user = await this.usersRepository.getByUsername(username);
    if (!user) return null;
    return user;
  }

  async updateUser(username: string, updateUserDto: UpdateUserDto) {
    username = username.toLowerCase();
    const user = await this.usersRepository.getByUsername(username);

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

    const updatedUser = await this.usersRepository.updateById(user.id, {
      ...rest,
      password: hashedPassword
    });

    delete updatedUser.password;
    return updatedUser;
  }

  async getUserHandles(username: string) {
    username = username.toLowerCase();
    const user = await this.usersRepository.getByUsername(username);
    if (!user) {
      throw new NotFoundException();
    }
    return this.handlesRepository.getByCriteria({ userId: user.id });
  }

  async updateUserHandles(
    username: string,
    updateHandlesDto: UpdateHandlesDto
  ) {
    username = username.toLowerCase();
    const user = await this.usersRepository.getByUsername(username);
    if (!user) {
      throw new NotFoundException();
    }
    await this.handlesRepository.deleteByCriteria({ userId: user.id });
    const result = await this.handlesRepository.createBulk(
      updateHandlesDto.handles
        .filter((el) => el.handle.length > 0)
        .map((el) => ({
          ...el,
          userId: user.id
        }))
    );
    return result;
  }
}
