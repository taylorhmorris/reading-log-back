import { Action } from '../utils/action';
import { AppAbility, Subjects } from '../casl-ability.factory';
import { IPolicyHandler } from './policy.handler';
import { Fields } from '../utils/fields';

export class UpdateGenericPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility, subject: Subjects, fields?: Fields) {
    let isAuth = true;
    if (fields) {
      for (const field in fields) {
        isAuth = isAuth && ability.can(Action.Update, subject, field);
      }
    } else {
      isAuth = ability.can(Action.Update, subject);
    }
    return isAuth;
  }
}

export class DeleteGenericPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility, subject: Subjects) {
    const isAuth = ability.can(Action.Delete, subject);
    return isAuth;
  }
}
