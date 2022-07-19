import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
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

  @Column({ nullable: true })
  mobile?: string

  @Column({ nullable: true, default: "CSE" })
  department?: string

  @Column({ nullable: true })
  batch?: number

  @Column({ nullable: true, type: "float" })
  cgpa?: number

  @Column({ default: "user" })
  role?: string

  @CreateDateColumn({ select: false })
  created_at?: Date

  private tempPassword: string
  @AfterLoad()
  private loadTempPassword(): void {
    this.tempPassword = this.password
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword?() {
    if (this.tempPassword !== this.password) {
      this.password = await bcrypt.hash(this.password, 10)
    }
    this.username = this.username.toLowerCase()
  }
}
