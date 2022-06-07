import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  Index,
} from "typeorm"
import { Tag } from "../problems/tag.entity"
import { UserStudyList } from "./user-studies.entity"

@Entity({ name: "user_studies_tags" })
export class UserStudiesTag {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public study_id!: number

  @Column()
  public tag_id!: number

  @ManyToOne(() => UserStudyList, (post) => post.user_studies_tags)
  @JoinColumn({ name: "study_id" })
  public study!: UserStudyList

  @ManyToOne(() => Tag, (category) => category.user_studies_tags)
  @JoinColumn({ name: "tag_id" })
  public tag!: Tag
}
