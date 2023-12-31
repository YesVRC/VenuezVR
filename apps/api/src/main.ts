import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:5173',
      'https://localhost:5173',
      'https://www.venuezvr.com',
      'http://www.venuezvr.com',
      'https://venuezvr.com',
      'http://venuezvr.com',
    ],
  });
  const docs = new DocumentBuilder()
    .setTitle('VenuezVR')
    .setDescription('API for VenuezVR')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, docs);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
