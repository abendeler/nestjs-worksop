import { IntersectionType } from '@nestjs/swagger';
import { CreatorDto } from './creator.model.dto';
import { IdParamsDto } from './id.model.dto';
import { MutateTaskRequestParams } from '../types/api/mutate-task-request-params.type';

export class MutateTaskRequestParamsDto
  extends IntersectionType(CreatorDto, IdParamsDto)
  implements MutateTaskRequestParams {}
