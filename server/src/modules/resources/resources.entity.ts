import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm"

@Entity({ name: "resources" })
export class Resource {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  type: string

  @Column({ unique: true })
  link: string

  @Column()
  difficulty: string

  @Column()
  language: string

  @CreateDateColumn()
  created_at: Date
}
