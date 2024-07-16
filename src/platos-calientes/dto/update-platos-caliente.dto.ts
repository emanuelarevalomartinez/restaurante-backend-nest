import { PartialType } from '@nestjs/mapped-types';
import { CreatePlatosCalienteDto } from './create-platos-caliente.dto';

export class UpdatePlatosCalienteDto extends PartialType(CreatePlatosCalienteDto) {}
