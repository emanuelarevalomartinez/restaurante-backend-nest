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
      
      const platoCaliente = await this.platoCalienteModel.create({
        id: UUID(),
         ...createPlatosCalienteDto,
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


  // async findAll(ordenAsc?: boolean) {
  //   let ordenAMostrar: 1 | -1 = 1;

  //   if (typeof ordenAsc !== 'undefined') {
  //     ordenAMostrar = ordenAsc ? 1 : -1;
  //   }

  //   return await this.platoCalienteModel.find()
  //     .sort({ descripcionPlato: ordenAMostrar })
  //     .select({ _id: 0, __v: 0 })
  //     .then(platos => {
  //       const platosConImagen = platos.filter(plato => plato.imagenAsociada && typeof plato.imagenAsociada === 'string');
  //       return platosConImagen.map(plato => ({
  //         ...plato.toObject(),
  //         imagenAsociada: `http://localhost:3000/images/platosCalientes/${plato.imagenAsociada}`
  //       }));
  //     });
  //   }

  async findAll(ordenAsc?: boolean) {
    let ordenAMostrar: 1 | -1 = 1;
    if (typeof ordenAsc !== 'undefined') {
      ordenAMostrar = ordenAsc ? 1 : -1;
    }

    try {
      
      const platosCalientes = await this.platoCalienteModel.find().sort({ descripcionPlato: ordenAMostrar }).select({ _id: 0, __v: 0 });
      const totalDeProductos = await this.platoCalienteModel.countDocuments();
  
      const platosCalientesConImagen = platosCalientes.filter(platoCaliente => platoCaliente.imagenAsociada && typeof platoCaliente.imagenAsociada === 'string').map(platoCaliente => ({
        ...platoCaliente.toObject(),
        imagenAsociada: `http://localhost:3000/images/platosCalientes/${platoCaliente.imagenAsociada}`
      }));
  
      return { platos: platosCalientesConImagen, totalDeProductos };


    } catch (error) {
      throw new BadRequestException("All platos calientes can not find");
    }

  }




  // async findAll(ordenAsc? : boolean) {

  //   let orden = 1;

  //   if (typeof ordenAsc !== 'undefined') {
  //     orden = ordenAsc ? 1 : -1;
  //   }

  //   return await this.platoCalienteModel.find().sort({ descripcionPlato: orden}).select({ _id:0, __v:0, }).then(platos => {
  //     const platosConImagen = platos.filter(plato => plato.imagenAsociada && typeof plato.imagenAsociada === 'string');
  //     return platosConImagen.map(plato => ({
  //      ...plato.toObject(),
  //       imagenAsociada: `http://localhost:3000/images/platosCalientes/${plato.imagenAsociada}`
  //     }));
  //   });
  // }

  async fineOne(idPlato: string){
     try {
      const unPlato = this.platoCalienteModel.findOne( { id: idPlato } );
      return unPlato;
     } catch (error) {
       throw new BadRequestException(` plato with id ${idPlato} not found `);
     }
  }

  async obtenerCantidadRestante(idPlato: string) {
    try {
       let platoCaliente:PlatosCaliente = await this.platoCalienteModel.findOne({ id: idPlato });
       return Number(platoCaliente.cantRestante);
     } catch (error) {
        throw new NotFoundException(`Plato caliente with id ${idPlato} not found`);
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
        throw new BadRequestException("Plato-Caliente can not update by id");
    }
  }
  // async updateByPedido(id: string,cantidad: number) {


  //   try {

  //    const nuevo:number = await this.findOne(id);

  //     const upPLatoCa = await this.platoCalienteModel.findOneAndUpdate(
  //       { id: id },
  //       // { 
  //       //   cantRestante: nuevo + cantidad,
  //       //  },
  //       { $set: { cantRestante: nuevo + cantidad } }, 
  //       { new: true },
  //       );
  //     return upPLatoCa;
  //   } catch (error) {
  //       throw new BadRequestException("Plato-Caliente can not update");
  //   }
  // }

  async updateByPedido(id: string, cantidad: number) {
    try {
      const nuevo: number = await this.obtenerCantidadRestante(id);
      const cantidadNumero: number = Number(cantidad);

      
      const upPLatoCa = await this.platoCalienteModel.findOneAndUpdate(
        { id: id },
        { 
          cantRestante: nuevo + cantidadNumero,
        },
        { new: true },
      );
      
      return upPLatoCa;
    } catch (error) {
      throw new BadRequestException("Plato-Caliente can not update by id pedido");
    }
  }
  

  remove(id: number) {
    return `This action removes a #${id} platosCaliente`;
  }
}
