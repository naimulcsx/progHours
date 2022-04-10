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
    return this.usersRepository.findOne(match)
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

  async getVerdictCount(user, verdict) {
    return this.submissionsRepository
      .createQueryBuilder()
      .select("COUNT(verdict)")
      .where("user_id = :userId", { userId: user.id })
      .andWhere("verdict = :verdict", { verdict })
      .execute()
  }

  async getProgress(user) {
    const [AC] = await this.getVerdictCount(user, "AC")

    const { count } = await this.submissionsRepository
      .createQueryBuilder("submission")
      .where("submission.user_id = :userId", { userId: user.id })
      .andWhere("submission.verdict = 'AC'")
      .innerJoinAndSelect("submission.problem", "problems")
      .select("COUNT(problems.difficulty)")
      .andWhere("problems.difficulty > 0")
      .getRawOne()

    const { sum } = await this.submissionsRepository
      .createQueryBuilder("submission")
      .select("SUM(solve_time)")
      .where("user_id = :userId", { userId: user.id })
      .andWhere("submission.verdict = 'AC'")
      .getRawOne()

    const { total_difficulty } = await this.submissionsRepository
      .createQueryBuilder("submission")
      .where("submission.user_id = :userId", { userId: user.id })
      .andWhere("submission.verdict = 'AC'")
      .innerJoinAndSelect("submission.problem", "problems")
      .select("SUM(problems.difficulty) as total_difficulty")
      .getRawOne()

    return {
      solve_count: parseInt(AC.count),
      solve_time: parseInt(sum) || 0,
      avg_difficulty: parseInt(total_difficulty) / parseInt(count) || 0,
    }
  }

  async getStats(user) {
    const [AC] = await this.getVerdictCount(user, "AC")
    const [WA] = await this.getVerdictCount(user, "WA")
    const [RTE] = await this.getVerdictCount(user, "RTE")
    const [MLE] = await this.getVerdictCount(user, "MLE")
    const [TLE] = await this.getVerdictCount(user, "TLE")
    return {
      AC: parseInt(AC.count),
      WA: parseInt(WA.count),
      RTE: parseInt(RTE.count),
      MLE: parseInt(MLE.count),
      TLE: parseInt(TLE.count),
    }
  }

  async getRanklist() {
    const users = await this.usersRepository
      .createQueryBuilder("user")
      .select(["user.username", "user.name", "user.id"])
      .getMany()
    // console.log(users);
    const result = []
    for (let user of users) {
      const acSolutions = await this.submissionsRepository
        .createQueryBuilder()
        .select("COUNT(verdict)")
        .where("user_id = :userId", { userId: user.id })
        .andWhere("verdict = :verdict", { verdict: "AC" })
        .execute()

      const solveTime = await this.submissionsRepository
        .createQueryBuilder()
        .select("SUM(solve_time)")
        .where("user_id = :userId", { userId: user.id })
        .andWhere("verdict = :verdict", { verdict: "AC" })
        .execute()

      const { total_difficulty } = await this.submissionsRepository
        .createQueryBuilder("submission")
        .where("submission.user_id = :userId", { userId: user.id })
        .andWhere("submission.verdict = 'AC'")
        .innerJoinAndSelect("submission.problem", "problems")
        .select("SUM(problems.difficulty) as total_difficulty")
        .getRawOne()

      result.push({
        ...user,
        avg_difficulty:
          parseInt(total_difficulty) / parseInt(acSolutions[0].count) || 0,
        solve_count: parseInt(acSolutions[0].count),
        solve_time: parseInt(solveTime[0].sum) || 0,
      })
    }
    return result
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
