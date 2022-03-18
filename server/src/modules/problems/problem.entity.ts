import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from "typeorm"

/**
 * Import Entities (models)
 */
import { Tag } from "@/modules/problems/tag.entity"
import { UserProblemTag } from "@/modules/problems/user-problem-tag"

@Entity({ name: "problems" })
export class Problem {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  pid: string

  @Column()
  name: string

  @Column({ unique: true })
  link: string

  @Column()
  difficulty: number

  @CreateDateColumn()
  created_at: Date

  @ManyToMany(() => Tag, { cascade: ["insert"] })
  @JoinTable({
    name: "problem_tags",
    joinColumn: {
      name: "problem_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "tag_id",
      referencedColumnName: "id",
    },
  })
  tags: Tag[]

  @OneToMany(() => UserProblemTag, (userProblemTag) => userProblemTag.problem)
  public user_problem_tags!: UserProblemTag[]
}
