import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePlatosFrioDto } from './dto/create-platos-frio.dto';
import { UpdatePlatosFrioDto } from './dto/update-platos-frio.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PlatosFrio } from './entities/platos-frio.entity';
import { Model } from 'mongoose';
import { v4 as UUID } from 'uuid'

@Injectable()
export class PlatosFriosService {

 constructor(
  @InjectModel( PlatosFrio.name )
  private readonly platosFriosModel :Model<PlatosFrio>
 ){

 }

  async create(createPlatosFrioDto: CreatePlatosFrioDto) {
    try {
      const nuevoPlatoFrio = await this.platosFriosModel.create( {
        idPlatoFrio: UUID(),
        ...createPlatosFrioDto,
      } )
      return nuevoPlatoFrio;
    } catch (error) {
      throw new BadRequestException("Nuevo Plato frío no fue creado"+error);
    }
  }

  async findAll() {
    try{
    return await this.platosFriosModel.find().select({
      _id: 0,
      __v:0,
    })
    .then( platosFrios=> {
      const platosFriosConImagenes = platosFrios.filter( platoFrio=> platoFrio.imagenAsociada && typeof platoFrio.imagenAsociada === "string" );
        return platosFriosConImagenes.map(platoFrio => ({
       ...platoFrio.toObject(),
        imagenAsociada: `http://localhost:3000/images/platosFrios/${platoFrio.imagenAsociada}`
      }));
    } )
    } catch (error) {
      throw new BadRequestException("All platos frios can not find");
    }
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
