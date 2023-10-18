import { Site } from 'src/sites/entities/site.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'passwords' })
export class Password {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', name: 'password', nullable: false })
  password: string;

  @Column({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
  @Column({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.passwords, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;
  @ManyToOne(() => Site, (site) => site.passwords, { nullable: false })
  @JoinColumn({ name: 'site_id' })
  site: Site;
}
