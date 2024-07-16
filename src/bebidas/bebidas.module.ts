import { Module } from '@nestjs/common';
import { BebidasService } from './bebidas.service';
import { BebidasController } from './bebidas.controller';

@Module({
  controllers: [BebidasController],
  providers: [BebidasService],
})
export class BebidasModule {}
