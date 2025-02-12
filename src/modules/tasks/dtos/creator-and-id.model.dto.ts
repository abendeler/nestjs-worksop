import { IntersectionType } from '@nestjs/swagger';
import { CreatorDto } from './creator.model.dto';
import { IdParamsDto } from './id.model.dto';

export class CreatorAndIdDto extends IntersectionType(
  CreatorDto,
  IdParamsDto,
) {}
