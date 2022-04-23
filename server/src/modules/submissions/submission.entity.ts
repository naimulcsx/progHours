import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm"

/**
 * Import Entities (models)
 */
import { User } from "@/modules/users/user.entity"
import { Problem } from "@/modules/problems/problem.entity"

@Entity({ name: "submissions" })
@Index(["user", "verdict", "solve_time"])
export class Submission {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  user_id: number

  @Column()
  problem_id: number

  @Column()
  solve_time: number

  @Column({ type: "timestamp with time zone" })
  solved_at: String

  @Column()
  verdict: string

  @ManyToOne(() => Problem, (problem) => problem.id, { nullable: false })
  @JoinColumn({ name: "problem_id" })
  problem: number

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user: number
}
