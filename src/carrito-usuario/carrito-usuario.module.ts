import { Module } from '@nestjs/common';
import { CarritoUsuarioService } from './carrito-usuario.service';
import { CarritoUsuarioController } from './carrito-usuario.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CarritoUsuario, CarritoUsuarioSchema } from './entities/carrito-usuario.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { Usuario, UsuarioSchema } from 'src/usuario/entities/usuario.entity';
import { PlatosCalientesModule } from 'src/platos-calientes/platos-calientes.module';
import { PlatosCaliente, PlatosCalientesSchema } from 'src/platos-calientes/entities/platos-caliente.entity';
import { Bebida, BebidasSchema } from 'src/bebidas/entities/bebida.entity';
import { Postre, PostreSchema } from 'src/postres/entities/postre.entity';
import { PlatoFrioSchema, PlatosFrio } from 'src/platos-frios/entities/platos-frio.entity';



@Module({
  imports: [
    MongooseModule.forFeature([
      {
      name: CarritoUsuario.name,
      schema: CarritoUsuarioSchema,
    },
      {
      name: Usuario.name,
      schema: UsuarioSchema,
    },
      {
      name: PlatosCaliente.name,
      schema: PlatosCalientesSchema,
    },
      {
      name: PlatosFrio.name,
      schema: PlatoFrioSchema,
    },
      {
      name: Bebida.name,
      schema: BebidasSchema,
    },
      {
      name: Postre.name,
      schema: PostreSchema,
    },
  ]),
  UsuarioModule,
  PlatosCalientesModule,
],
  controllers: [CarritoUsuarioController],
  providers: [CarritoUsuarioService],
})
export class CarritoUsuarioModule {}
