import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  Index,
} from "typeorm"
import { Problem } from "./problem.entity"
import { Tag } from "./tag.entity"

@Entity({ name: "user_problem_tags" })
@Index(["user_id", "problem_id", "tag_id"])
export class UserProblemTag {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public user_id!: number

  @Column()
  public problem_id!: number

  @Column()
  public tag_id!: number

  // @ManyToOne(() => Problem, (post) => post.user_problem_tags)
  // @JoinColumn({ name: "problem_id" })
  // public problem!: Problem

  // @ManyToOne(() => Tag, (category) => category.user_problem_tags)
  // @JoinColumn({ name: "tag_id" })
  // public tag!: Tag
}
