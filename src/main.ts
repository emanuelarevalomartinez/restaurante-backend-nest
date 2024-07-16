import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe())
  app.setGlobalPrefix("api");
  app.use('/images', express.static(join(process.cwd(), 'public/images')));// establece laruta para la consulta de las img
  app.enableCors(); // permite que se puedan recibir solicitudes desde el frontend 
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
   }) ); // asegura que los datos enviados a la consulta complan con la validacion especificada
  await app.listen(3000);
  //125.125.12.30:
}
bootstrap();