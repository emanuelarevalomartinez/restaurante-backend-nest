import { Injectable } from '@nestjs/common';
import { CreateBebidaDto } from './dto/create-bebida.dto';
import { UpdateBebidaDto } from './dto/update-bebida.dto';

@Injectable()
export class BebidasService {
  create(createBebidaDto: CreateBebidaDto) {
    return 'This action adds a new bebida';
  }

  findAll() {
    return `This action returns all bebidas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bebida`;
  }

  update(id: number, updateBebidaDto: UpdateBebidaDto) {
    return `This action updates a #${id} bebida`;
  }

  remove(id: number) {
    return `This action removes a #${id} bebida`;
  }
}
