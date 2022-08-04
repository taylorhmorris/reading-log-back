import { PickType } from '@nestjs/swagger';
import { Language } from '../entities/language.entity';

export class CreateLanguageDto extends PickType(Language, ['owner', 'name']) {}
