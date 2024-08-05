import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBebidaDto } from './dto/create-bebida.dto';
import { UpdateBebidaDto } from './dto/update-bebida.dto';
import { Model } from 'mongoose';
import { Bebida } from './entities/bebida.entity';
import { v4 as UUID } from 'uuid'
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BebidasService {

constructor(
  @InjectModel(Bebida.name)
  private readonly bebidasModel: Model<Bebida>
){
  
}


 async create(createBebidaDto: CreateBebidaDto) {
    try {
      
     const nuevaBebida = await this.bebidasModel.create( {
      idBebida: UUID(),
      ...createBebidaDto,
     } );
     return nuevaBebida;

    } catch (error) {
      throw new BadRequestException("error al crear nueva bebida");
    }
  }

  async findAll(ordenAsc?: boolean) {

    let ordenAMostrar: 1 | -1 = 1;
    if (typeof ordenAsc !== 'undefined') {
      ordenAMostrar = ordenAsc ? 1 : -1;
    }

    try {
      
      const bebidas = await this.bebidasModel.find().sort({ descripcionBebida: ordenAMostrar }).select({ _id: 0, __v: 0 });
      const totalDeProductos = await this.bebidasModel.countDocuments();
  
      const bebidasConImagen = bebidas.filter(bebida => bebida.imagenAsociada && typeof bebida.imagenAsociada === 'string').map(bebida => ({
        ...bebida.toObject(),
        imagenAsociada: `http://localhost:3000/images/bebidas/${bebida.imagenAsociada}`
      }));
  
      return { bebidas: bebidasConImagen, totalDeProductos };

      
    } catch (error) {
      throw new BadRequestException("All platos calientes can not find");
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} bebida`;
  }

  async obtenerCantidadRestante(idBebida: string) {
    try {
       let bebida = await this.bebidasModel.findOne({ idBebida: idBebida });
       return Number(bebida.cantRestante);
     } catch (error) {
        throw new NotFoundException(`Bebida with id ${idBebida} not found`);
     }
  }

  async update(idBebida: string, updateBebidaDto: UpdateBebidaDto) {

    try {

      const updBebida = this.bebidasModel.findOneAndUpdate( { idBebida: idBebida } ,
        updateBebidaDto,
        { new: true },
        );
        return updBebida;
      
    } catch (error) {
      throw new BadRequestException("Bebida can not update");
    }
   

  }

  async updateByPedido(idBebida: string, cantidad: number){
     try {
      const nuevo: number = await this.obtenerCantidadRestante(idBebida);
      const cantidadNumero: number = Number(cantidad);
      
      const updBebida = this.bebidasModel.findOneAndUpdate( 
        { idBebida: idBebida },
        { cantRestante: nuevo + cantidadNumero},
        {new: true},
        );
         return updBebida;
     } catch (error) {
      throw new BadRequestException("Bebida can not update by pedido");
     }
  }



  remove(id: number) {
    return `This action removes a #${id} bebida`;
  }
}
