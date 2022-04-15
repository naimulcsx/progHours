import {
  ConflictException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

/**
 * Import Entities (models)
 */
import { User } from "@/modules/users/user.entity"
import { Submission } from "@/modules/submissions/submission.entity"
import { AuthService } from "../auth/auth.service"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Submission)
    private submissionsRepository: Repository<Submission>,

    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) {}

  /**
   * Find user that matches given properties
   */
  async getUser(match) {
    /**
     * Consider username to be case insensitive
     */
    if (typeof match.username === "string")
      match.username = match.username.toLowerCase()
    /**
     * Find out the user
     */
    return this.usersRepository.findOne(match)
  }

  /**
   * Query builder for users repository
   */
  createQueryBuilder(alias) {
    return this.usersRepository.createQueryBuilder(alias)
  }

  /**
   * Creates a new user
   */
  async createUser(
    name: string,
    email: string,
    username: string,
    password: string
  ): Promise<User> {
    /**
     * Check if username or email is already taken
     */
    let usernameExists = await this.getUser({ username })
    if (usernameExists) throw new ConflictException("Username already exists.")

    let emailExists = await this.getUser({ email })
    if (emailExists) throw new ConflictException("Email already exists.")

    /**
     * All good! Create a new user
     */
    const newUser = this.usersRepository.create({
      name,
      username,
      password,
      email,
    })
    return this.usersRepository.save(newUser)
  }

  /**
   * Update Profile
   */
  async updateProfile({ name, email }, userId) {
    const user = await this.getUser({ id: userId })
    /**
     * This condition will never be hit, unless you have access token of an user which is not there in the database
     */
    if (!user) {
      return new NotFoundException("User not found.")
    }
    user.name = name
    user.email = email
    return this.usersRepository.save(user)
  }

  /**
   * Users user password
   */
  async updatePassword(passwordFields, userId) {
    const [currentPassword, newPassword, confirmPassword] = passwordFields

    const user = await this.getUser({ id: userId })
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
     * If new password and confirm password do not match
     */
    if (newPassword !== confirmPassword) {
      throw new ForbiddenException(
        "New password and confirm password do not match."
      )
    }
    /**
     * Update the password
     */
    user.password = newPassword
    return this.usersRepository.save(user)
  }
}
