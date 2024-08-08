import { Injectable } from '@nestjs/common';
import { CreateCorreoDto } from './dto/create-correo.dto';
import { UpdateCorreoDto } from './dto/update-correo.dto';

@Injectable()
export class CorreosService {
  create(createCorreoDto: CreateCorreoDto) {
    return 'This action adds a new correo';
  }

  findAll() {
    return `This action returns all correos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} correo`;
  }

  update(id: number, updateCorreoDto: UpdateCorreoDto) {
    return `This action updates a #${id} correo`;
  }

  remove(id: number) {
    return `This action removes a #${id} correo`;
  }
}
