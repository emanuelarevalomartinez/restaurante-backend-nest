import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlatosCalientesService } from './platos-calientes.service';
import { CreatePlatosCalienteDto } from './dto/create-platos-caliente.dto';
import { UpdatePlatosCalienteDto } from './dto/update-platos-caliente.dto';
import { Auth, GetUser } from 'src/usuario/decoradores';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Roles } from 'src/usuario/interfaces';

@Controller('platos-calientes')
export class PlatosCalientesController {
  constructor(private readonly platosCalientesService: PlatosCalientesService) {}

  @Post()
  create(@Body() createPlatosCalienteDto: CreatePlatosCalienteDto) {
    return this.platosCalientesService.create(createPlatosCalienteDto);
  }

  @Get()
 
  findAll(
  ) {
    return this.platosCalientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platosCalientesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlatosCalienteDto: UpdatePlatosCalienteDto) {
    return this.platosCalientesService.update(+id, updatePlatosCalienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.platosCalientesService.remove(+id);
  }
}
