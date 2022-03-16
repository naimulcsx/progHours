import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
} from "typeorm"
import * as bcrypt from "bcrypt"

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column()
  role: string

  @CreateDateColumn()
  created_at: Date

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}
