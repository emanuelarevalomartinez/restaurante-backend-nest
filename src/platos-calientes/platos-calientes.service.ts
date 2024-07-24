import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePlatosCalienteDto } from './dto/create-platos-caliente.dto';
import { UpdatePlatosCalienteDto } from './dto/update-platos-caliente.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PlatosCaliente } from './entities/platos-caliente.entity';
import { Model } from 'mongoose';
import { v4 as UUID } from 'uuid'

@Injectable()
export class PlatosCalientesService {

  constructor(
    @InjectModel(PlatosCaliente.name) 
    private platoCalienteModel: Model<PlatosCaliente>
      ) {

    }

  async create(createPlatosCalienteDto: CreatePlatosCalienteDto) {
    try {

      const { id, ...nuevoPlato } = createPlatosCalienteDto;
      
      const platoCaliente = await this.platoCalienteModel.create({
         ...nuevoPlato,
         id: UUID(),
      });
      return platoCaliente; 
    } catch (error) {
      if(error.code == 11000 ){
        throw new BadRequestException(`PLato caliente exist on data base ${ JSON.stringify(error.keyValue) }`);
      } else {
        throw new InternalServerErrorException("Can't create Plato Caliente ");
      }
      
    }
  }

  async findAll() {
    return this.platoCalienteModel.find().then(platos => {
      const platosConImagen = platos.filter(plato => plato.imagenAsociada && typeof plato.imagenAsociada === 'string');
      return platosConImagen.map(plato => ({
       ...plato.toObject(),
        imagenAsociada: `http://localhost:3000/images/${plato.imagenAsociada}`
      }));
    });
  }

  async findOne(id: number) {
    let platoCaliente:PlatosCaliente;
     try {
    platoCaliente = await this.platoCalienteModel.findOne({ id: id });
    return platoCaliente;
     } catch (error) {
        throw new NotFoundException(`Plato caliente with id ${id} not found`);
     }
  }

  async update(id: string, updatePlatosCalienteDto: UpdatePlatosCalienteDto) {

    try {
      const upPLatoCa = await this.platoCalienteModel.findOneAndUpdate(
        { id: id },
        updatePlatosCalienteDto,
        { new: true },
        );
      return upPLatoCa;
    } catch (error) {
        throw new BadRequestException("Plato-Caliente can not update");
    }
  }

  remove(id: number) {
    return `This action removes a #${id} platosCaliente`;
  }
}
