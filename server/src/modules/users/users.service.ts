import { ConflictException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

/**
 * Import Entities (models)
 */
import { User } from "@/modules/users/user.entity"
import { Submission } from "@/modules/submissions/submission.entity"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Submission)
    private submissionsRepository: Repository<Submission>
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
   * Update user account
   */
  // async updateAccount(body: any, id: any) {
  //   const { name, email, currentPassword, newPassword, confirmPassword } = body

  //   const user = await this.usersRepository.findOne({ id })

  //   if (currentPassword || newPassword || confirmPassword) {
  //     if (!currentPassword || !newPassword || !confirmPassword) {
  //       throw new ForbiddenException("Field must be filled")
  //     }
  //   }

  //   if (currentPassword && newPassword && confirmPassword) {
  //     const isCorrect = await this.authService.comparePassword(
  //       currentPassword,
  //       user.password
  //     )
  //     if (!isCorrect)
  //       throw new ForbiddenException("current password is not correct")

  //     if (newPassword !== confirmPassword)
  //       throw new ForbiddenException("password doesn't matched")

  //     user.password = newPassword
  //   }

  //   user.email = email
  //   user.name = name

  //   return this.usersRepository.save(user)
  // }
}
