import { Controller, Get, Post, Body, Patch, Param, Delete, ParseBoolPipe } from '@nestjs/common';
import { PlatosFriosService } from './platos-frios.service';
import { CreatePlatosFrioDto } from './dto/create-platos-frio.dto';
import { UpdatePlatosFrioDto } from './dto/update-platos-frio.dto';

@Controller('platos-frios')
export class PlatosFriosController {
  constructor(private readonly platosFriosService: PlatosFriosService) {}

  @Post()
  create(@Body() createPlatosFrioDto: CreatePlatosFrioDto) {
    return this.platosFriosService.create(createPlatosFrioDto);
  }

  @Get(':ordenAsc?')
  findAll(
    @Param('ordenAsc', new ParseBoolPipe({ optional: true })) ordenAsc?: boolean
    ) {
    return this.platosFriosService.findAll(ordenAsc);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platosFriosService.findOne(+id);
  }

  @Patch(':idPlatoFrio')
  update(
    @Param('idPlatoFrio') idPlatoFrio: string, 
    @Body() updatePlatosFrioDto: UpdatePlatosFrioDto
    ) {
    return this.platosFriosService.update(idPlatoFrio, updatePlatosFrioDto);
  }
  @Patch('updateWhitPLatoFrio/:idPlatoFrio/:cantidad')
  updateWhitPedido(
    @Param('idPlatoFrio') idPlatoFrio: string, 
    @Param('cantidad') cantidad: number, 
    ) {
    return this.platosFriosService.updateByPedido(idPlatoFrio, cantidad);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.platosFriosService.remove(+id);
  }
}
