// 📁 backend/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Validation globale
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  
  // CORS pour autoriser les requêtes du frontend
  app.enableCors({
    origin: true,  // Autorise toutes les origines (à restreindre en production)
    credentials: true,
  });
  
  // Préfixe global pour toutes les routes API
  app.setGlobalPrefix('api/v1');

  // Port d'écoute - Render fournit la variable PORT
  const port = process.env.PORT || 3000;
  
  // Écouter sur toutes les interfaces (0.0.0.0) pour Render
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 Serveur démarré sur http://0.0.0.0:${port}`);
  console.log(`📝 API disponible sous /api/v1`);
  console.log(`🔗 URL de base: ${process.env.RENDER_EXTERNAL_URL || 'http://localhost:' + port}`);
}

bootstrap();