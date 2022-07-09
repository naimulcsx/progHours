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
import { LoginUserDto } from "@/validators/login-user-dto"

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
  async signIn({ username, password }: { username: string; password: string }) {
    username = username.toLowerCase()
    /**
     * Get user by id
     */
    // const user = await this.usersService.getUserWithPassword(username)
    const user = await this.prisma.user.findUnique({ where: { username } })

    /**
     ** If username doesn't exist in our database
     */
    if (!user) {
      throw new NotFoundException("User not found.")
    }

    /**
     ** Username exists, need to check if the provided password is valid
     */
    const isValidPassword = await this.comparePassword(password, user.password)

    /**
     * if the user exists, but the provided password is wrong
     */
    if (!isValidPassword) throw new ForbiddenException("Password incorrect.")

    /**
     * Password is valid, generate access token
     */
    const { password: pw, ...userObj } = user
    const accessToken = this.generateAccessToken(userObj)
    return {
      user: userObj,
      accessToken,
    }
  }

  async signUp({
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
    // * Check if username or email is already taken
    username = username.toLowerCase()

    const usernameExists = await this.prisma.user.findUnique({
      where: { username },
    })
    if (usernameExists) throw new ConflictException("Username already exists.")

    const emailExists = await this.prisma.user.findUnique({ where: { email } })
    if (emailExists) throw new ConflictException("Email already exists.")

    // TODO: If there is no users, we need to seed OJ table

    // * All good! Create a new user
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
}
