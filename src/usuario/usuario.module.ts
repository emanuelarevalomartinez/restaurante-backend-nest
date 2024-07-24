import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from './entities/usuario.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwTokenStrategy } from './strategies/jwt.strategy';
import { CarritoUsuarioModule } from 'src/carrito-usuario/carrito-usuario.module';
import { CarritoUsuario, CarritoUsuarioSchema } from 'src/carrito-usuario/entities/carrito-usuario.entity';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, JwTokenStrategy],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Usuario.name,
        schema: UsuarioSchema,
      },
      {
        name: CarritoUsuario.name,
        schema: CarritoUsuarioSchema,
      },
    ]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
        useFactory: (configureService: ConfigService) => {
            return{
              secret: configureService.get("JWT_SECRET"),
              signOptions: {
                expiresIn: "2h",
              }
            }
        }

    })
  ],
  exports: [MongooseModule ,JwTokenStrategy, PassportModule, JwtModule, UsuarioService ]
})
export class UsuarioModule {}
