import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  PrimaryColumn,
  Index,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'user_tags' })
export class UserTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  tag_name: string;
}
