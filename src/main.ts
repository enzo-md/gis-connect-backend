// 📁 backend/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();
  app.setGlobalPrefix('api/v1');

  // ⚠️ Forcer le port pour Render
  const port = process.env.PORT ? parseInt(process.env.PORT) : 8080;
  
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 Serveur démarré sur http://0.0.0.0:${port}`);
  console.log(`📝 API disponible sous /api/v1`);
}

bootstrap();