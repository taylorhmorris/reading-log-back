import { AppAbility, Subjects } from '../casl-ability.factory';
import { Fields } from '../utils/fields';

export interface IPolicyHandler {
  handle(ability: AppAbility, subject: Subjects, fields: Fields): boolean;
}

type PolicyHandlerCallback = (
  ability: AppAbility,
  subject: Subjects,
  fields: Fields,
) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
