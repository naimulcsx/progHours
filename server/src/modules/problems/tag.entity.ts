import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { UserProblemTag } from "./user-problem-tag"

@Entity({ name: "tags" })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => UserProblemTag, (userProblemTag) => userProblemTag.tag)
  public user_problem_tags!: UserProblemTag[]
}
