import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
// import { UserStudiesTag } from "../user-studies/user-studies-tag.entity"
import { UserProblemTag } from "./user-problem-tag"

@Entity({ name: "tags" })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  // @OneToMany(() => UserProblemTag, (userProblemTag) => userProblemTag.tag)
  // public user_problem_tags!: UserProblemTag[]

  // @OneToMany(() => UserStudiesTag, (userProblemTag) => userProblemTag.tag)
  // public user_studies_tags!: UserProblemTag[]
}
