import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CarritoUsuarioService } from './carrito-usuario.service';
import { CreateCarritoUsuarioDto } from './dto/create-carrito-usuario.dto';
import { UpdateCarritoUsuarioDto } from './dto/update-carrito-usuario.dto';

@Controller('carrito-usuario')
export class CarritoUsuarioController {
  constructor(private readonly carritoUsuarioService: CarritoUsuarioService) {}

  @Post(":idUsuario")
  create(
    @Param("idUsuario") idUsuario: ParseUUIDPipe,
    @Body() createCarritoUsuarioDto: CreateCarritoUsuarioDto
    ) {
    return this.carritoUsuarioService.create(idUsuario,createCarritoUsuarioDto);
  }

  @Get()
  findAll() {
    return this.carritoUsuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carritoUsuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarritoUsuarioDto: UpdateCarritoUsuarioDto) {
    return this.carritoUsuarioService.update(+id, updateCarritoUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carritoUsuarioService.remove(+id);
  }
}
