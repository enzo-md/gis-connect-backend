// 📁 backend/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
  origin: true,  // Autorise toutes les origines (pour développement)
  credentials: true,
});
  app.setGlobalPrefix('api/v1');
  
  await app.listen(3000);
  console.log('🚀 Serveur démarré sur http://localhost:3000');
  console.log('📝 API disponible sous /api/v1');
}
bootstrap();