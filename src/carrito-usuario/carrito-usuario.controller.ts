import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CarritoUsuarioService } from './carrito-usuario.service';
import { CreateCarritoUsuarioDto } from './dto/create-carrito-usuario.dto';
import { UpdateCarritoUsuarioDto } from './dto/update-carrito-usuario.dto';

@Controller('carrito-usuario')
export class CarritoUsuarioController {
  constructor(private readonly carritoUsuarioService: CarritoUsuarioService) {}

  //* me quede en la intercepcion de los carritos entre el backend y el frontend
  //* manejando el tema del localstorage para usarlo a la  horade añadir elementos y ver como se maneja la lista de el carroto

  @Post(":idUsuario/:idProducto")
  crearCarrito(
    @Param("idUsuario", ParseUUIDPipe) idUsuario: string,
    @Param("idProducto", ParseUUIDPipe) idProducto: string,
    @Body() createCarritoUsuarioDto: CreateCarritoUsuarioDto
    ) {
    return this.carritoUsuarioService.crearCarritoCompra(idUsuario,idProducto,createCarritoUsuarioDto);
  }

  @Get(":idUsuario")
  findAll(
    @Param("idUsuario", ParseUUIDPipe) idUsuario: string,
  ) {
    return this.carritoUsuarioService.findAllCarritoCompra(idUsuario);
  }

  @Get('obtenerUnCarrito/:idCarrito')
  buscarCarrito(@Param('idCarrito',ParseUUIDPipe) id: string) {
    return this.carritoUsuarioService.buscarUnCarrito(id);
  }

  @Patch(':idUsuario/:idProducto')
  actualizarElementosDelCarrito(
    @Param('idUsuario',ParseUUIDPipe) idUsuario: string,
    @Param('idProducto',ParseUUIDPipe) idProducto: string,
    @Body() updateCarritoUsuarioDto: UpdateCarritoUsuarioDto) {
    return this.carritoUsuarioService.actualizarCarrito(idUsuario,idProducto, updateCarritoUsuarioDto);
  }

  @Delete('viaUsuario/:idUsuario/:idProducto')
  removeViaUsuario(
    @Param('idUsuario',ParseUUIDPipe) idUsuario: string,
    @Param('idProducto',ParseUUIDPipe) idProducto: string,
  ) {
    return this.carritoUsuarioService.removeCarritoCompraViaUsuario(idUsuario,idProducto);
  }

  @Delete(':idCarrito')
  remove(
    @Param('idCarrito',ParseUUIDPipe) idCarrito: string,
  ) {
    return this.carritoUsuarioService.removeCarritoCompra(idCarrito);
  }
}
