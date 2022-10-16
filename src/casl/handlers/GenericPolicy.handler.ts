import { Action } from '../utils/action';
import { AppAbility, Subjects } from '../casl-ability.factory';
import { IPolicyHandler } from './policy.handler';
import { Fields } from '../utils/fields';
import { Logger } from '@nestjs/common';
import { OwnedEntity } from '@/common/entities/owned.entity';

export class CreateGenericPolicyHandler implements IPolicyHandler {
  private readonly logger = new Logger(CreateGenericPolicyHandler.name);

  handle(ability: AppAbility, subject: Subjects, fields: Fields) {
    this.logger.debug(`Subject: ${JSON.stringify(subject)}`);
    this.logger.debug(`Fields: ${JSON.stringify(fields)}`);
    const isAuth = ability.can(
      Action.Create,
      new OwnedEntity(subject as OwnedEntity),
    );
    this.logger.debug(`Is Authorized: ${JSON.stringify(isAuth)}`);
    return isAuth;
  }
}

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
    ability.on;
    return isAuth;
  }
}
