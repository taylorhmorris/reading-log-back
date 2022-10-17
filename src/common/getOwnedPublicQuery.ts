import { FindOptionsWhere } from 'typeorm';
import { AuthUserToken } from './dto/auth-user-payload.dto';
import { OwnedEntity } from './entities/owned.entity';

export function getOwnedPublicQuery<Entity extends OwnedEntity>(
  user: AuthUserToken,
  query?: FindOptionsWhere<Entity>,
): Array<FindOptionsWhere<Entity>> {
  const queries: Array<FindOptionsWhere<Entity>> = [];
  const queryOwned: any = { ...query };
  queryOwned.owner = { id: user.userId };
  queryOwned.owner.id = user.userId;
  const queryPublic: any = { ...query };
  queryPublic.isPublic = true;

  if (query?.isPublic === undefined || query?.isPublic === true)
    queries.push(queryPublic);
  if (query?.ownerId === undefined || query?.ownerId === user.userId)
    queries.push(queryOwned);
  return queries;
}
