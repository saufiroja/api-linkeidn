import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('feed')
export class Feed {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  body: string;

  @CreateDateColumn()
  createdAt: Date;
}
