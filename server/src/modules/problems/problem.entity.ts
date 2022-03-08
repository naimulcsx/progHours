import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Tag } from './tag.entity';
import { UserTag } from './user-tags.entity';

@Entity({ name: 'problems' })
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
  @ManyToMany(() => Tag, { cascade: ['insert'] })
  @JoinTable({
    name: 'problem_tags',
    joinColumn: {
      name: 'problem_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags: Tag[];

  @ManyToMany(() => UserTag, { cascade: ['update'] })
  @JoinTable({
    name: 'user_problem_tags',
    joinColumn: {
      name: 'problem_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_tag_id',
      referencedColumnName: 'id',
    },
  })
  user_tags: UserTag[];
}
