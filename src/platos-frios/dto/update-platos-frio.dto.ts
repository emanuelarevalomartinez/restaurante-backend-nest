import { PartialType } from '@nestjs/mapped-types';
import { CreatePlatosFrioDto } from './create-platos-frio.dto';

export class UpdatePlatosFrioDto extends PartialType(CreatePlatosFrioDto) {}
