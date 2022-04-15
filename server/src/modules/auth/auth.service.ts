import {
  ForbiddenException,
  Injectable,
  Inject,
  NotFoundException,
  forwardRef,
} from "@nestjs/common"
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcryptjs"

/**
 * Import Entities (models)
 */
import { UsersService } from "../users/users.service"
import { LoginUserDto } from "@/validators/login-user-dto"

@Injectable()
export class AuthService {
  constructor(
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
  async handleLogin(username: string, password: string) {
    /**
     * Get user by id
     */
    const user = await this.usersService.getUser({ username })

    /**
     * If username doesn't exist in our database
     */
    if (!user) {
      console.log("hello world!!!")
      throw new NotFoundException("User not found.")
    }

    /**
     * Username exists, need to check if the provided password is valid
     */
    const isValidPassword = await this.comparePassword(password, user.password)

    /**
     * if the user exists, but the provided password is wrong
     */
    if (!isValidPassword) throw new ForbiddenException("Password incorrect.")

    /**
     * Password is valid, generate access token
     */
    const userObj = {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
    }
    const accessToken = this.generateAccessToken(userObj)

    return {
      user: userObj,
      accessToken,
    }
  }
}
