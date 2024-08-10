import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { UpdateNotificacionDto } from './dto/update-notificacion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Notificacion } from './entities/notificacion.entity';
import { Model } from 'mongoose';
import { v4 as UUID } from 'uuid'
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class NotificacionesService {

  constructor(
    @InjectModel(Notificacion.name)
    private readonly notificacionesModel: Model<Notificacion>,

    @InjectModel(Usuario.name)
    private readonly usuariosModel: Model<Usuario>,
  ){
  
  }


  async create(idUsuario: string,createNotificacioneDto: CreateNotificacionDto) {
    const fechaActual = new Date();
    const fecha = `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()}`; 

    const hora = fechaActual.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    
    const findUsuario = await this.usuariosModel.findOne( { idUsuario: idUsuario } );

    if(!findUsuario){
      throw new BadRequestException(`Usuario con id ${idUsuario} not found`);
    }

   try {
    const crearNotificacion = await this.notificacionesModel.create({
      idNotificacion: UUID(),
      fecha,
      hora,
      fechaActual: fechaActual,
      idUsuario: findUsuario.idUsuario,
      ...createNotificacioneDto,
    });
    return crearNotificacion;
   } catch (error) {
   throw new BadRequestException(`Nueva notifiacionno pudo ser creada ${error}`);
   }

  }

  async findAll(idUsuario:string,ordenDes?: boolean) {

    let ordenAMostrar: -1 | 1 = -1;
    if (typeof ordenDes !== 'undefined') {
      ordenAMostrar = ordenDes ? -1 : 1;
    }

   try {
    return await this.notificacionesModel.find({ idUsuario: idUsuario })
    .sort({ fechaActual: ordenAMostrar })
    .select({ _id: 0, __v: 0 });

   } catch (error) {
    throw new BadRequestException(`All Notificaciones can not found`);
   }
  }

  findOne(id: number) {
    return `This action returns a #${id} notificacione`;
  }

  update(id: number, updateNotificacioneDto: UpdateNotificacionDto) {
    return `This action updates a #${id} notificacione`;
  }

  async remove(idNotificacion: string) {
      const { deletedCount } = await this.notificacionesModel.deleteOne({ idNotificacion: idNotificacion });
      if(deletedCount == 0){
        throw new BadRequestException(`Id de notificacion ${idNotificacion} no encontrado`);
     }
     return;
  }
}
