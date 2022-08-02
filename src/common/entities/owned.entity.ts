import { User } from '@/users/entities/user.entity';
import { ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class OwnedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  owner: User;
}
