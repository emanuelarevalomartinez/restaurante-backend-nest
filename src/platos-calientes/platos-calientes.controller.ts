import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, ParseBoolPipe } from '@nestjs/common';
import { PlatosCalientesService } from './platos-calientes.service';
import { CreatePlatosCalienteDto } from './dto/create-platos-caliente.dto';
import { UpdatePlatosCalienteDto } from './dto/update-platos-caliente.dto';

@Controller('platos-calientes')
export class PlatosCalientesController {
  constructor(private readonly platosCalientesService: PlatosCalientesService) {}

  @Post()
  create(@Body() createPlatosCalienteDto: CreatePlatosCalienteDto) {
    return this.platosCalientesService.create(createPlatosCalienteDto);
  }

  @Get(':ordenAsc?')
  findAll(
    @Param('ordenAsc', new ParseBoolPipe({ optional: true })) ordenAsc?: boolean
    ) {
    return this.platosCalientesService.findAll(ordenAsc);
  }

  @Get(':idPlato')
  obtenerRestantes(@Param('idPlato',ParseUUIDPipe) idPlato: string) {
    return this.platosCalientesService.obtenerCantidadRestante(idPlato);
  }
  @Get('obtenerUno/:idPlato')
  fineOne(@Param('idPlato',ParseUUIDPipe) idPlato: string) {
    return this.platosCalientesService.fineOne(idPlato);
  }

  @Patch(':id')
  update(@Param('id',ParseUUIDPipe) id: string, @Body() updatePlatosCalienteDto: UpdatePlatosCalienteDto) {
    return this.platosCalientesService.update(id, updatePlatosCalienteDto);
  }
  @Patch('updateWhitPedido/:id/:cantidad')
  updateWhitPedido(
    @Param('id',ParseUUIDPipe) id: string,
    @Param('cantidad') cantidad: number, 
  ) {
    return this.platosCalientesService.updateByPedido(id,cantidad);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.platosCalientesService.remove(+id);
  }
}
