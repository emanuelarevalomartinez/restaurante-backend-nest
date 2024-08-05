import { Controller, Get, Post, Body, Patch, Param, Delete, ParseBoolPipe } from '@nestjs/common';
import { BebidasService } from './bebidas.service';
import { CreateBebidaDto } from './dto/create-bebida.dto';
import { UpdateBebidaDto } from './dto/update-bebida.dto';

@Controller('bebidas')
export class BebidasController {
  constructor(private readonly bebidasService: BebidasService) {}

  @Post()
  create(@Body() createBebidaDto: CreateBebidaDto) {
    return this.bebidasService.create(createBebidaDto);
  }

  @Get(':ordenAsc?')
  findAll(
    @Param('ordenAsc', new ParseBoolPipe({ optional: true })) ordenAsc?: boolean
    ) {
    return this.bebidasService.findAll(ordenAsc);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bebidasService.findOne(+id);
  }

  @Patch(':idBebida')
  update(@Param('idBebida') idBebida: string, @Body() updateBebidaDto: UpdateBebidaDto) {
    return this.bebidasService.update(idBebida, updateBebidaDto);
  }

  @Patch('updateWhitBebida/:id/:cantidad')
  updateWhitPedido(
    @Param('id') id: string,
    @Param('cantidad') cantidad: number,
     ) {
    return this.bebidasService.updateByPedido(id,cantidad);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bebidasService.remove(+id);
  }
}
