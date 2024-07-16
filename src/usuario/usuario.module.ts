import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from './entities/usuario.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwTokenStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, JwTokenStrategy],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Usuario.name,
        schema: UsuarioSchema,
      }
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
  exports: [MongooseModule ,JwTokenStrategy, PassportModule, JwtModule ]
})
export class UsuarioModule {}
