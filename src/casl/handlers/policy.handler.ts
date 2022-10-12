import { AppAbility, Subjects } from '../casl-ability.factory';

export interface IPolicyHandler {
  handle(ability: AppAbility, subject: Subjects): boolean;
}

type PolicyHandlerCallback = (
  ability: AppAbility,
  subject: Subjects,
) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
