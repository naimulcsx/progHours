import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { User } from "../users/user.entity"

@Entity({ name: "ranklist" })
export class Ranking {
  @Column({ primary: true })
  user_id: number

  @Column({ default: 0 })
  total_difficulty?: number

  @Column({ default: 0 })
  total_solve_time?: number

  @Column({ default: 0 })
  total_solved?: number

  @Column({ default: 0 })
  total_solved_with_difficulty?: number

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user: number
}
