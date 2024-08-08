import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CorreosService } from './correos.service';
import { CreateCorreoDto } from './dto/create-correo.dto';
import { UpdateCorreoDto } from './dto/update-correo.dto';

@Controller('correos')
export class CorreosController {
  constructor(private readonly correosService: CorreosService) {}

  @Post()
  create(@Body() createCorreoDto: CreateCorreoDto) {
    return this.correosService.create(createCorreoDto);
  }

  @Get()
  findAll() {
    return this.correosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.correosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCorreoDto: UpdateCorreoDto) {
    return this.correosService.update(+id, updateCorreoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.correosService.remove(+id);
  }
}
