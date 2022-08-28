import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common"

/**
 * Import Entities (models)
 */
import { AuthService } from "../auth/auth.service"
import { PrismaService } from "../prisma/prisma.service"
import * as bcrypt from "bcryptjs"
import { UpdateUserDto } from "@/validators/update-user-dto"

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,

    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) {}

  async getUserById(id) {
    return this.prisma.user.findUnique({ where: { id } })
  }

  async getUserByUsername(username) {
    return this.prisma.user.findUnique({
      where: { username: username.toLowerCase() },
    })
  }

  async createUser(
    name: string,
    email: string,
    username: string,
    password: string
  ) {
    // Check if username or email is already taken
    username = username.toLowerCase()
    const usernameExists = await this.prisma.user.findUnique({
      where: { username },
    })
    if (usernameExists) throw new ConflictException("Username already exists.")
    const emailExists = await this.prisma.user.findUnique({ where: { email } })
    if (emailExists) throw new ConflictException("Email already exists.")
    // TODO: If there is no users, we need to seed OJ table
    // All good! Create a new user
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
      },
    })
    // TODO: Create a user ranking row for that user
    return newUser
  }

  async updateProfile({
    id,
    name,
    email,
    mobile,
    department,
    batch,
    cgpa,
    section,
  }) {
    const user = await this.prisma.user.findUnique({ where: { id } })
    // This condition will never be hit, unless you have access
    // token of an user which is not there in the database
    if (!user) {
      throw new NotFoundException("User not found.")
    }
    const result = await this.prisma.user.update({
      where: { id: id },
      data: {
        name,
        email,
        mobile: mobile || null,
        department,
        batch: Number(batch) || null,
        cgpa: Number(cgpa) || null,
        section,
      },
    })
    // return the updated profile
    return result
  }

  async updatePassword({ currentPassword, newPassword }, userId) {
    const user = await this.getUserById(userId)
    /**
     * This condition will never be hit, unless you have access token of an user which is not there in the database
     */
    if (!user) {
      return new NotFoundException("User not found.")
    }
    /**
     * Check if the currentPassword is correct
     */
    const isValid = await this.authService.comparePassword(
      currentPassword,
      user.password
    )
    if (!isValid) {
      throw new ForbiddenException("Current password is invalid.")
    }
    /**
     * Update the password
     */
    return this.prisma.user.update({
      where: { username: user.username },
      data: {
        password: newPassword,
      },
    })
  }

  /**********************  ADMIN  ******************** */
  async getAllUsers() {
    return this.prisma.user.findMany()
  }

  async updateUserData(
    { name, batch, department, role, mobile, cgpa, section, username, email },
    id: number,
    userId: number
  ) {
    try {
      // const userFound = await this.prisma.user.findUnique({
      //   where: {
      //     id,
      //   },
      // })

      // if (userFound && userId === userFound.id)
      //   throw new BadRequestException("Username already exist!")

      return this.prisma.user.update({
        where: {
          id,
        },
        data: {
          username: username.toLowerCase(),
          email,
          name,
          batch: Number(batch) || null,
          department: department || null,
          role,
          mobile: mobile || null,
          cgpa: Number(cgpa) || null,
          section: section || null,
        },
      })
    } catch (err) {
      throw err
    }
  }
}
