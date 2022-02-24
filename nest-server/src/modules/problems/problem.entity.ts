import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Problem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  pid: string;

  @Column()
  name: string;

  @Column({ unique: true })
  link: string;

  @Column()
  difficulty: number;

  @CreateDateColumn()
  created_at: Date;
}
