import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { OnlineJudge } from "../online-judges/online-judge.entity"
import { User } from "../users/user.entity"

@Entity()
export class Handle {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  handle: string

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user_id: number

  @ManyToOne(() => OnlineJudge)
  @JoinColumn({ name: "judge_id" })
  judge_id: number
}
