import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove the properties that are not in the Dto
      forbidNonWhitelisted: true, // lanza bad request si hay propiedades que no estan en el Dto
      transform: true, // transform the data to the Dto type
      transformOptions: {
        enableImplicitConversion: true, // convert the data to the Dto type
      },
      // convert the data to the Dto type
    }),
  ); // validate Dtos, This pipe is used to validate the data that comes from the body
  // of the request and the parameters of the request,
  // apply the validation to all the methods in the controller

  await app.listen(process.env.PORT);
  console.log(`App running on port ${process.env.PORT}`);
}
bootstrap();
