import { Module } from '@nestjs/common';
import { CorreosService } from './correos.service';
import { CorreosController } from './correos.controller';

@Module({
  controllers: [CorreosController],
  providers: [CorreosService],
})
export class CorreosModule {}
