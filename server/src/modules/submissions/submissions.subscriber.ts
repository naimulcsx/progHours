import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from "typeorm"
import { Ranking } from "@/modules/ranking/ranking.entity"
import { Problem } from "@/modules/problems/problem.entity"
import { Submission } from "./submission.entity"

@EventSubscriber()
export class SubmissionsSubscriber
  implements EntitySubscriberInterface<Submission>
{
  constructor(connection: Connection) {
    connection.subscribers.push(this)
  }
  listenTo() {
    return Submission
  }

  /**
   * After a submission is inserted, update ranklist
   */
  async afterInsert(event: InsertEvent<Submission>) {
    const rankingRepository = event.connection.getRepository(Ranking)
    let userRanking = await rankingRepository.findOne({
      user_id: event.entity.user_id,
    })
    if (!userRanking) {
      throw new Error("User not found in ranklist!")
    }

    const problem = await event.connection
      .getRepository(Problem)
      .findOne({ id: event.entity.problem_id })

    if (problem.difficulty > 0) userRanking.total_solved_with_difficulty++
    userRanking.total_difficulty += problem.difficulty
    userRanking.total_solve_time += event.entity.solve_time
    userRanking.total_solved += event.entity.verdict === "AC" ? 1 : 0
    await rankingRepository.save(userRanking)
  }

  /**
   * After a submission is deleted, update ranklist
   */
  async beforeRemove(event: RemoveEvent<Submission>) {
    const rankingRepository = event.connection.getRepository(Ranking)
    let userRanking = await rankingRepository.findOne({
      user_id: event.entity.user_id,
    })
    if (!userRanking) {
      throw new Error("User not found in ranklist!")
    }
    const problem = await event.connection
      .getRepository(Problem)
      .findOne({ id: event.entity.problem_id })

    if (problem.difficulty > 0) userRanking.total_solved_with_difficulty--
    userRanking.total_difficulty -= problem.difficulty
    userRanking.total_solve_time -= event.entity.solve_time
    userRanking.total_solved -= event.entity.verdict === "AC" ? 1 : 0
    await rankingRepository.save(userRanking)
  }

  /**
   * After a submission is updated, update ranklist
   */
  async beforeUpdate(event: UpdateEvent<Submission>) {
    const submissionsRepository = event.connection.getRepository(Submission)
    const rankingRepository = event.connection.getRepository(Ranking)
    const submission = await submissionsRepository.findOne({
      id: event.entity.id,
    })
    let userRanking = await rankingRepository.findOne({
      user_id: submission.user_id,
    })
    if (event.entity.solve_time) {
      userRanking.total_solve_time +=
        event.entity.solve_time - submission.solve_time
    }
    if (event.entity.verdict) {
      const problem = await event.connection
        .getRepository(Problem)
        .findOne({ id: submission.problem_id })
      if (event.entity.verdict !== "AC") {
        userRanking.total_solved--
        userRanking.total_solve_time -= submission.solve_time
        if (problem.difficulty > 0) userRanking.total_solved_with_difficulty--
      } else {
        userRanking.total_solved++
        userRanking.total_solve_time += submission.solve_time
        if (problem.difficulty > 0) userRanking.total_solved_with_difficulty++
      }
    }
    await rankingRepository.save(userRanking)
  }
}
