import { OwnedEntity } from '@common/entities/owned.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Author extends OwnedEntity {
  @Column()
  firstNames: string;

  @Column()
  lastName: string;
}
