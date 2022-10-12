import { Action } from '../action';
import { AppAbility, Subjects } from '../casl-ability.factory';
import { IPolicyHandler } from '../policy.handler';

export class UpdateUserPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility, subject: Subjects) {
    const isAuth = ability.can(Action.Update, subject);
    return isAuth;
  }
}

export class DeleteUserPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility, subject: Subjects) {
    const isAuth = ability.can(Action.Delete, subject);
    return isAuth;
  }
}
