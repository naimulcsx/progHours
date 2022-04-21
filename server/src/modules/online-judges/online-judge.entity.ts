import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "online_judges" })
export class OnlineJudge {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string
}
