import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostreDto } from './dto/create-postre.dto';
import { UpdatePostreDto } from './dto/update-postre.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Postre } from './entities/postre.entity';
import { Model } from 'mongoose';
import { v4 as UUID } from 'uuid'

@Injectable()
export class PostresService {

constructor(
  @InjectModel(Postre.name)
  private readonly postresModule: Model<Postre>,
){

}

  async create(createPostreDto: CreatePostreDto) {
   try {
      const nuevoPostre = await this.postresModule.create({
        idPostre: UUID(),
        ...createPostreDto,
      })
      return nuevoPostre;
   } catch (error) {
        throw new BadRequestException(`Nuevo postre no pudo ser creado ${error}`);
   }
  }

  async findAll(ordenAsc?: boolean) {
    let ordenAMostrar: 1 | -1 = 1;
    if (typeof ordenAsc !== 'undefined') {
      ordenAMostrar = ordenAsc ? 1 : -1;
    }

    try {
      
      const postres = await this.postresModule.find().sort({ descripcionPostre: ordenAMostrar }).select({ _id: 0, __v: 0 });
      const totalDeProductos = await this.postresModule.countDocuments();
  
      const postresConImagen = postres.filter(postre => postre.imagenAsociada && typeof postre.imagenAsociada === 'string').map(postre => ({
        ...postre.toObject(),
        imagenAsociada: `http://localhost:3000/images/postres/${postre.imagenAsociada}`
      }));
  
      return { postres: postresConImagen, totalDeProductos };

      
    } catch (error) {
      throw new BadRequestException("All platos calientes can not find");
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} postre`;
  }

  async obtenerCantidadRestante(idPostre: string) {
    try {
       let postre = await this.postresModule.findOne({ idPostre: idPostre });
       return Number(postre.cantRestante);
     } catch (error) {
        throw new NotFoundException(`Postre with id ${idPostre} not found`);
     }
  }

  async update(idPostre: string, updatePostreDto: UpdatePostreDto) {
    try {

      const upPostre = await this.postresModule.findOneAndUpdate(
         { idPostre: idPostre } ,
        updatePostreDto,
        { new: true },
        );
        return upPostre;
      
    } catch (error) {
      throw new BadRequestException("Postre can not update");
    }
   
  }

  async updateByPedido(idPostre: string, cantidad: number){
    try {
      const nuevo: number = await this.obtenerCantidadRestante(idPostre);
      const cantidadNumero: number = Number(cantidad);
      
      const upPostre = this.postresModule.findOneAndUpdate( 
        { idPostre: idPostre },
        { cantRestante: nuevo + cantidadNumero},
        {new: true},
        );
         return upPostre;
     } catch (error) {
      throw new BadRequestException(`Postre can not update by pedido ${error}`);
     }
  }

  remove(id: number) {
    return `This action removes a #${id} postre`;
  }
}
