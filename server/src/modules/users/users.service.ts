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
import { OnlineJudgesService } from "../online-judges/online-judges.service"
import { Ranking } from "../ranking/ranking.entity"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Submission)
    private submissionsRepository: Repository<Submission>,

    @InjectRepository(Ranking)
    private rankingRepository: Repository<Ranking>,

    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,

    @Inject(OnlineJudgesService)
    private onlineJudgesService: OnlineJudgesService
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
   * Find user password
   */

  getUserWithPassword(username: string) {
    return this.usersRepository
      .createQueryBuilder("user")
      .where("user.username = :username", { username: username.toLowerCase() })
      .addSelect("user.password")
      .getOne()
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
     * If there is no users, we need to seed OJ table
     */

    const numberOfUsers = await this.usersRepository.count({})
    if (!numberOfUsers) {
      await this.onlineJudgesService.seed()
    }

    /**
     * All good! Create a new user
     */
    const newUser = this.usersRepository.create({
      name,
      username,
      password,
      email,
    })
    const savedUser = await this.usersRepository.save(newUser)

    /**
     * Create a ranking row for that user
     */
    await this.rankingRepository.save({ user_id: savedUser.id })
    return savedUser
  }

  /**
   * Update Profile
   */
  async updateProfile(
    { name, email, mobile, department, batch, cgpa },
    userId
  ) {
    const user = await this.getUser({ id: userId })
    /**
     * This condition will never be hit, unless you have access token of an user which is not there in the database
     */
    if (!user) {
      throw new NotFoundException("User not found.")
    }

    user.name = name || user.name
    user.email = email || user.email

    /**
     * Optional Informations
     * Implementing this way leaves no way to set the values to NULL
     * Todo: Find a solution for this
     */
    user.mobile = mobile || user.mobile
    user.department = department || user.department
    user.batch = batch || user.batch
    user.cgpa = cgpa || user.cgpa

    return this.usersRepository.save(user)
  }

  /**
   * Users user password
   */
  async updatePassword({ currentPassword, newPassword }, userId) {
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
     * Update the password
     */
    user.password = newPassword
    return this.usersRepository.save(user)
  }
}
