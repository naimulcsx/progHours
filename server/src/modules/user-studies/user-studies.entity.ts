import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm"
import { Tag } from "../problems/tag.entity"

import { User } from "../users/user.entity"
import { UserStudiesTag } from "./user-studies-tag"

@Entity({ name: "user_studies" })
export class UserStudyList {
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

  @OneToMany(() => UserStudiesTag, (userStudyTag) => userStudyTag.study)
  public user_studies_tags!: UserStudiesTag[]
}
