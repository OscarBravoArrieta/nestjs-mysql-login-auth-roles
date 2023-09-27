 import { NestFactory } from '@nestjs/core'
 import { AppModule } from './app.module'
 import { ValidationPipe } from '@nestjs/common';

 async function bootstrap() {
     
     const app = await NestFactory.create(AppModule)
     app.setGlobalPrefix("api/v1")
     app.useGlobalPipes(
         new ValidationPipe({
             whitelist: true, // The data entry, should by en the white list
             forbidNonWhitelisted: true,
             transform: true, //Trasnform the data. Is the data is strig. This is convertet to number automatically
         })
     )

     await app.listen(3000);
 }
 bootstrap();
