import { Exclude } from 'class-transformer';
import { Feed } from 'src/feed/models/feed.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from './role.enum';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany((_type) => Feed, (task) => task.user, { eager: true })
  @Exclude({ toPlainOnly: true })
  feed: Feed[];
}
