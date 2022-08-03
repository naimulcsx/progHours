import {
  ForbiddenException,
  Injectable,
  Inject,
  NotFoundException,
  forwardRef,
  ConflictException,
} from "@nestjs/common"
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcryptjs"
import { PrismaService } from "../prisma/prisma.service"

/**
 * Import Entities (models)
 */
import { UsersService } from "../users/users.service"

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService
  ) {}

  /**
   * Checks if password is valid
   */
  comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
  }

  /**
   * Generates access token
   */
  generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  }

  /**
   *
   * @param body
   * @returns
   */
  async handleLogin({
    username,
    password,
  }: {
    username: string
    password: string
  }) {
    username = username.toLowerCase()
    // get user by id
    const user = await this.prisma.user.findUnique({ where: { username } })

    // if username doesn't exist in our database
    if (!user) {
      throw new NotFoundException("User not found.")
    }

    // username exists, need to check if the provided password is valid
    const isValidPassword = await this.comparePassword(password, user.password)

    // if the user exists, but the provided password is wrong
    if (!isValidPassword) throw new ForbiddenException("Password incorrect.")

    delete user.password

    // password is valid, generate access token
    const accessToken = this.generateAccessToken(user)

    return {
      accessToken,
      user,
    }
  }

  async handleRegister({
    username,
    name,
    email,
    password,
  }: {
    name: string
    email: string
    username: string
    password: string
  }) {
    // Check if username is taken
    username = username.toLowerCase()

    const usernameExists = await this.prisma.user.findUnique({
      where: { username },
    })
    if (usernameExists) throw new ConflictException("Username already exists.")

    // check if the email is taken
    const emailExists = await this.prisma.user.findUnique({ where: { email } })
    if (emailExists) throw new ConflictException("Email already exists.")

    // All good! Create a new user
    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        username,
        password,
      },
    })

    // Create a user stats row for that user
    await this.prisma.userStat.create({
      data: {
        userId: newUser.id,
      },
    })

    return newUser
  }
}
