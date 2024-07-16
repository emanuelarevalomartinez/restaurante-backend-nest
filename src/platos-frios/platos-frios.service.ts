import { Injectable } from '@nestjs/common';
import { CreatePlatosFrioDto } from './dto/create-platos-frio.dto';
import { UpdatePlatosFrioDto } from './dto/update-platos-frio.dto';

@Injectable()
export class PlatosFriosService {
  create(createPlatosFrioDto: CreatePlatosFrioDto) {
    return 'This action adds a new platosFrio';
  }

  findAll() {
    return `This action returns all platosFrios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} platosFrio`;
  }

  update(id: number, updatePlatosFrioDto: UpdatePlatosFrioDto) {
    return `This action updates a #${id} platosFrio`;
  }

  remove(id: number) {
    return `This action removes a #${id} platosFrio`;
  }
}
