import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm"
import * as bcrypt from "bcryptjs"

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ unique: true })
  username: string

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ default: "user" })
  role?: string

  @CreateDateColumn({ select: false })
  created_at?: Date

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword?() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}
