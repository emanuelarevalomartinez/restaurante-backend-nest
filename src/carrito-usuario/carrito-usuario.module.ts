import { Module } from '@nestjs/common';
import { CarritoUsuarioService } from './carrito-usuario.service';
import { CarritoUsuarioController } from './carrito-usuario.controller';

@Module({
  controllers: [CarritoUsuarioController],
  providers: [CarritoUsuarioService],
})
export class CarritoUsuarioModule {}
