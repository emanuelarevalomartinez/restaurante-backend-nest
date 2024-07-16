import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Get()
  findAll() {
    return this.bebidasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bebidasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBebidaDto: UpdateBebidaDto) {
    return this.bebidasService.update(+id, updateBebidaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bebidasService.remove(+id);
  }
}
