import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { LoginUserDto } from './dto';


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
  @Get(':idUsuario')
  findOne(@Param('idUsuario') idUsuario: ParseUUIDPipe) {
    return this.usuarioService.findOneUsuario(idUsuario);
  }


  @Patch(':idUsuario')
  update(@Param('idUsuario') idUsuario: ParseUUIDPipe, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.updateUsuario(idUsuario, updateUsuarioDto);
  }

  @Delete(':idUsuario')
  remove(@Param('idUsuario') idUsuario: ParseUUIDPipe) {
    return this.usuarioService.removeUsuario( idUsuario );
  }
}
