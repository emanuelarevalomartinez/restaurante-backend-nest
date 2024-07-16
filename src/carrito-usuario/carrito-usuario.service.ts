import { Injectable } from '@nestjs/common';
import { CreateCarritoUsuarioDto } from './dto/create-carrito-usuario.dto';
import { UpdateCarritoUsuarioDto } from './dto/update-carrito-usuario.dto';

@Injectable()
export class CarritoUsuarioService {
  create(createCarritoUsuarioDto: CreateCarritoUsuarioDto) {
    return 'This action adds a new carritoUsuario';
  }

  findAll() {
    return `This action returns all carritoUsuario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carritoUsuario`;
  }

  update(id: number, updateCarritoUsuarioDto: UpdateCarritoUsuarioDto) {
    return `This action updates a #${id} carritoUsuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} carritoUsuario`;
  }
}
