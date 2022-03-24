import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OnlineJudges } from '../online-judges/online-judges.entity';
import { User } from '../users/user.entity';

@Entity()
export class Handle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  handle: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => OnlineJudges)
  @JoinColumn({ name: 'judge_id' })
  judge_id: number;
}
