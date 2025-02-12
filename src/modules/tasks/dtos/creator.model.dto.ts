import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { WithCreator } from '../types/partials/with-creator.type';

export class CreatorDto implements WithCreator {
  @IsString()
  @ApiProperty({ example: 'anthony.bendeler.ext@luminus.be' })
  creator!: string;
}
