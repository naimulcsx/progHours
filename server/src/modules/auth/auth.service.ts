import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Inject,
  NotFoundException,
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcryptjs"

/**
 * Import Entities (models)
 */
import { User } from "@/modules/users/user.entity"
import { UsersService } from "../users/users.service"
import { LoginUserDto } from "@/validators/login-user-dto"

@Injectable()
export class AuthService {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

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

  async handleLogin(body: LoginUserDto) {
    /**
     * Get user by id
     */
    const user = await this.usersService.getUser({ username: body.username })

    /**
     * If username doesn't exist in our database
     */
    if (!user) throw new NotFoundException("User not found.")

    /**
     * Username exists, need to check if the provided password is valid
     */
    const isValidPassword = await this.comparePassword(
      body.password,
      user.password
    )

    /**
     * if the user exists, but the provided password is wrong
     */
    if (!isValidPassword) throw new ForbiddenException("User not found.")

    /**
     * Password is valid, generate access token
     */
    const { id, username, name, email, role } = user
    const userObj = { id, username, name, email, role }
    const accessToken = this.generateAccessToken(userObj)

    /**
     * Send response
     */
    return {
      user: userObj,
      accessToken,
    }
  }
}
