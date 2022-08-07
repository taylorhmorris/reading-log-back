import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { AppAbility, CaslAbilityFactory } from './casl-ability.factory';
import { CHECK_POLICIES_KEY } from './checkPolicies.decorator';
import { PolicyHandler } from './policy.handler';
import { Subjects } from './casl-ability.factory';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    protected reflector: Reflector,
    protected caslAbilityFactory: CaslAbilityFactory,
    protected configService: ConfigService,
    @InjectRepository(User)
    protected readonly usersRepository: Repository<User>,
  ) {}

  protected getRepository(): Repository<any> {
    throw new ForbiddenException('Invalid Subject');
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
    const body = request?.client?._httpMessage?.req?.body;
    const user = await this.usersRepository.findOneByOrFail({
      id: request.user.userId,
    });
    const ability = this.caslAbilityFactory.createForUser(user);

    let query = {};
    if (params && params.id) query = { id: params.id };
    const subjectRepository = this.getRepository();
    let subject: Subjects;
    try {
      subject = await subjectRepository.findOneByOrFail(query);
    } catch {
      throw new ForbiddenException('Could not get subject');
    }

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability, subject),
    );
  }

  private execPolicyHandler(
    handler: PolicyHandler,
    ability: AppAbility,
    subject: Subjects,
  ) {
    if (typeof handler === 'function') {
      return handler(ability, subject);
    }
    return handler.handle(ability, subject);
  }
}
