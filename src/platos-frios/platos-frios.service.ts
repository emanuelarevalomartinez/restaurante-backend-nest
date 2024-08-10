import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(ordenAsc?: boolean) {
    let ordenAMostrar: 1 | -1 = 1;
    if (typeof ordenAsc !== 'undefined') {
      ordenAMostrar = ordenAsc ? 1 : -1;
    }

    try {
      
      const platosFrios = await this.platosFriosModel.find().sort({ descripcionPlatoFrio: ordenAMostrar }).select({ _id: 0, __v: 0 });
      const totalDeProductos = await this.platosFriosModel.countDocuments();
  
      const platosFriosConImagen = platosFrios.filter(platoFrio => platoFrio.imagenAsociada && typeof platoFrio.imagenAsociada === 'string').map(platoFrio => ({
        ...platoFrio.toObject(),
        imagenAsociada: `http://localhost:3000/images/platosFrios/${platoFrio.imagenAsociada}`
      }));
  
      return { platosFrios: platosFriosConImagen, totalDeProductos };

      
    } catch (error) {
      throw new BadRequestException("All platos calientes can not find");
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} platosFrio`;
  }

  async obtenerCantidadRestante(idPlatoFrio: string) {
    try {
       let platoFrio = await this.platosFriosModel.findOne({ idPlatoFrio: idPlatoFrio });
       return Number(platoFrio.cantRestante);
     } catch (error) {
        throw new NotFoundException(`PLato Frio with id ${idPlatoFrio} not found`);
     }
  }

  async update(idPlatoFrio: string, updatePlatosFrioDto: UpdatePlatosFrioDto) {
    try {

      const upPatoFrio = await this.platosFriosModel.findOneAndUpdate(
         { idPlatoFrio: idPlatoFrio } ,
        updatePlatosFrioDto,
        { new: true },
        );
        return upPatoFrio;
      
    } catch (error) {
      throw new BadRequestException("Plato Frio can not update");
    }
   

  }
  
  async updateByPedido(idPlatoFrio: string, cantidad: number){
    try {
      const nuevo: number = await this.obtenerCantidadRestante(idPlatoFrio);
      const cantidadNumero: number = Number(cantidad);
      
      const upPLatoFrio = this.platosFriosModel.findOneAndUpdate( 
        { idPlatoFrio: idPlatoFrio },
        { cantRestante: nuevo + cantidadNumero},
        {new: true},
        );
         return upPLatoFrio;
     } catch (error) {
      throw new BadRequestException( `Plato frio can not update by pedido ${error}`);
     }
  }

  remove(id: number) {
    return `This action removes a #${id} platosFrio`;
  }
}
