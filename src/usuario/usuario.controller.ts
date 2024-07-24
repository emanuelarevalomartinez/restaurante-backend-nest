import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { LoginUserDto } from './dto';


//! HAY QUE CORREGIR EL DEFECTO DE COMO SE MUESTRAN LOS DATOS DEL CARRITO PARA QUE CARGUEN DESDE EL COMIENZO
//* EL ID DEL USUARIO ESTA ESTATICO HAY QUE PONERLO GENERICO
//* CREAR UN CONTEXTO PARA LA VALIDACIÓN DEL LOGIN Y EL USO DE ESOS DATOS DESDE EL LOCAL STORAGE

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post("register")
  async register(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.register(createUsuarioDto);
  }

  
  @Post('login')
  // @Auth( Roles.admin, Roles.superU, Roles.user )
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usuarioService.login( loginUserDto );
  }

  
  @Get()
  findAll() {
    return this.usuarioService.findAllUsuario();
  }
  @Get(':id')
  findOne(@Param('id') id: ParseUUIDPipe) {
    return this.usuarioService.findOneUsuario(id);
  }


  @Patch(':id')
  update(@Param('id') id: ParseUUIDPipe, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.updateUsuario(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ParseUUIDPipe) {
    return this.usuarioService.removeUsuario( id );
  }
}
