import { Module } from '@nestjs/common';
import { PlatosFriosService } from './platos-frios.service';
import { PlatosFriosController } from './platos-frios.controller';

@Module({
  controllers: [PlatosFriosController],
  providers: [PlatosFriosService],
})
export class PlatosFriosModule {}
