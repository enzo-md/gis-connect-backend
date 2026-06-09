// 📁 backend/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Validation globale
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  
  // CORS pour permettre les requêtes du frontend
  app.enableCors({
    origin: '*',  // Cyclic autorise toutes les origines
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  
  // Préfixe global pour l'API
  app.setGlobalPrefix('api/v1');

  // Port utilisé par Cyclic
  const port = process.env.PORT || 3000;
  
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 Serveur démarré sur le port ${port}`);
  console.log(`📝 API disponible sous /api/v1`);
}

bootstrap();