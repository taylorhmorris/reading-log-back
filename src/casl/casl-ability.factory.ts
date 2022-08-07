import { Author } from '@/authors/entities/author.entity';
import { Book } from '@/books/entities/book.entity';
import { OwnedEntity } from '@/common/entities/owned.entity';
import { Language } from '@/languages/entities/language.entity';
import { Note } from '@/notes/entities/note.entity';
import { Reading } from '@/readings/entities/reading.entity';
import { User } from '@/users/entities/user.entity';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action } from './action';

export type Subjects =
  | InferSubjects<
      | typeof User
      | typeof OwnedEntity
      | typeof Book
      | typeof Language
      | typeof Author
      | typeof Note
      | typeof Reading
    >
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    const allOwnedEntityTypes = [
      OwnedEntity,
      Author,
      Language,
      Book,
      Reading,
      Note,
    ];
    if (user.isAdmin) {
      can(Action.Manage, 'all');
    } else {
      // Users can modify themselves
      can(Action.Manage, User, { id: user.id });
      cannot(Action.Manage, User, ['isAdmin']).because(
        'You are not allowed to change your own admin status',
      );

      // Users can manage their own Private entities
      can(Action.Manage, allOwnedEntityTypes, {
        ownerId: user.id,
        isPublic: false,
      });
      can(Action.Read, allOwnedEntityTypes, { isPublic: true });

      // Users cannot delete or modify Public entities
      cannot(Action.Delete, allOwnedEntityTypes, { isPublic: true }).because(
        'You are not allowed to delete public entities',
      );
      cannot(Action.Update, allOwnedEntityTypes, { isPublic: true }).because(
        'You are not allowed to update public entities',
      );
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
