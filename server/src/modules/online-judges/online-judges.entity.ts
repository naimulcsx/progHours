import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'online_judges' })
export class OnlineJudges {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
