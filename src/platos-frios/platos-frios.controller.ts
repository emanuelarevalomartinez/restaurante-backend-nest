import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Get()
  findAll() {
    return this.platosFriosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platosFriosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlatosFrioDto: UpdatePlatosFrioDto) {
    return this.platosFriosService.update(+id, updatePlatosFrioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.platosFriosService.remove(+id);
  }
}
