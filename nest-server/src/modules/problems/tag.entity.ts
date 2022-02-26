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
} from 'typeorm';

@Entity({ name: 'tags' })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
