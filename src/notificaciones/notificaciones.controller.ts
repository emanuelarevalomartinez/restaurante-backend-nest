import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, ParseBoolPipe } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { UpdateNotificacionDto } from './dto/update-notificacion.dto';

@Controller('notificaciones')
export class NotificacionesController {
  constructor(private readonly notificacionesService: NotificacionesService) {}

  @Post(":idUsuario")
  create(
    @Param("idUsuario", ParseUUIDPipe) idUsuario: string,
    @Body() createNotificacioneDto: CreateNotificacionDto,
  ) {
    return this.notificacionesService.create(idUsuario,createNotificacioneDto);
  }

  @Get("buscarTodos/:idUsuario/:ordenDes?")
  findAll(
    @Param("idUsuario",ParseUUIDPipe) idUsuario: string,
    @Param('ordenDes', new ParseBoolPipe({ optional: true })) ordenDes?: boolean
  ) {
    return this.notificacionesService.findAll(idUsuario,ordenDes);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificacioneDto: UpdateNotificacionDto) {
    return this.notificacionesService.update(+id, updateNotificacioneDto);
  }

  @Delete(':idNotificacion')
  remove(@Param('idNotificacion') idNotificacion: string) {
    return this.notificacionesService.remove(idNotificacion);
  }
  @Delete('borrarTodas/:idUsuario')
  removeALL(@Param('idUsuario') idUsuario: string) {
    return this.notificacionesService.removeAllNotificacionesByUsuario(idUsuario);
  }
}
