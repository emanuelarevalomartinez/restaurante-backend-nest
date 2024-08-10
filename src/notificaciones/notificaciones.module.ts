import { Module } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { NotificacionesController } from './notificaciones.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notificacion, SchemaNotificacion } from './entities/notificacion.entity';
import { Usuario, UsuarioSchema } from 'src/usuario/entities/usuario.entity';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
      name: Notificacion.name,
      schema: SchemaNotificacion,
    },
      {
      name: Notificacion.name,
      schema: SchemaNotificacion,
    },
      {
      name: Usuario.name,
      schema: UsuarioSchema,
    },
  ])
  ],
  controllers: [NotificacionesController],
  providers: [NotificacionesService],
})
export class NotificacionesModule {}
