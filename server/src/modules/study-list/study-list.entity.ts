import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm"

import { User } from "../users/user.entity"
import { Resource } from "../resources/resources.entity"

@Entity({ name: "study_lists" })
export class StudyList {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  user_id: number

  @Column()
  resource_id: number

  @Column()
  study_time: number

  @Column()
  study_date: Date

  @CreateDateColumn()
  created_at: Date

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user: number

  @ManyToOne(() => Resource, (resource) => resource.id, { nullable: false })
  @JoinColumn({ name: "resource_id" })
  resource: number
}
