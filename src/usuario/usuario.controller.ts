import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post("register")
  async register(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.register(createUsuarioDto);
  }

  
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usuarioService.login( loginUserDto );
  }

  
  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: ParseUUIDPipe) {
    return this.usuarioService.findOne(id);
  }

  @Get("privado")
  @UseGuards( AuthGuard() )
  comprobar(){
    return{
      ok: true,
      message: "todo perfecto",
    }
  }

  @Patch(':id')
  update(@Param('id') id: ParseUUIDPipe, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ParseUUIDPipe) {
    return this.usuarioService.remove( id );
  }
}
