import { PartialType } from '@nestjs/mapped-types';
import { CreateCarritoUsuarioDto } from './create-carrito-usuario.dto';

export class UpdateCarritoUsuarioDto extends PartialType(CreateCarritoUsuarioDto) {}
