import { User } from 'src/auth/models/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
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

  @ManyToOne((_type) => User, (user) => user.feed, { eager: false })
  user: User;
}
