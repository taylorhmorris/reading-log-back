import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { AppAbility, CaslAbilityFactory } from '../casl-ability.factory';
import { CHECK_POLICIES_KEY } from '../checkPolicies.decorator';
import { PolicyHandler } from '../handlers/policy.handler';
import { Subjects } from '../casl-ability.factory';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import { Fields } from '../utils/fields';

@Injectable()
export class PoliciesGuard<T extends Subjects> implements CanActivate {
  private readonly logger = new Logger(PoliciesGuard.name);

  constructor(
    protected reflector: Reflector,
    protected caslAbilityFactory: CaslAbilityFactory,
    protected configService: ConfigService,
    @InjectRepository(User)
    protected readonly usersRepository: Repository<User>,
  ) {}

  _subjectRepository: Repository<any> = this.usersRepository;

  protected getRepository(): Repository<any> {
    return this._subjectRepository;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.configService.get('DISABLE_AUTHENTICATION') === true) {
      return true;
    }
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const request = context.switchToHttp().getRequest();
    const params = request?.client?._httpMessage?.req?.params;
    const fields = request?.client?._httpMessage?.req?.body;
    const user = await this.usersRepository.findOneByOrFail({
      id: request.user.userId,
    });
    const ability = this.caslAbilityFactory.createForUser(user);

    let query = undefined;
    if (params && params.id) query = { id: params.id };
    const subjectRepository = this.getRepository();
    let subject: Subjects;
    try {
      if (!query) {
        subject = fields as T;
      } else subject = await subjectRepository.findOneByOrFail(query);
    } catch {
      throw new ForbiddenException('Could not get subject');
    }

    this.logger.debug(`User: ${JSON.stringify(user)}`);
    this.logger.debug(`Subject: ${JSON.stringify(subject)}`);
    this.logger.debug(`Fields: ${JSON.stringify(fields)}`);
    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability, subject, fields),
    );
  }

  private execPolicyHandler(
    handler: PolicyHandler,
    ability: AppAbility,
    subject: Subjects,
    fields: Fields,
  ) {
    if (typeof handler === 'function') {
      return handler(ability, subject, fields);
    }
    return handler.handle(ability, subject, fields);
  }
}
