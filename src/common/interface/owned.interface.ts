import { FindOptionsWhereProperty } from 'typeorm';

export interface OwnedInterface {
  owner: FindOptionsWhereProperty<OwnedInterface>;
  ownerId: number;
  isPublic: FindOptionsWhereProperty<OwnedInterface>;
}
