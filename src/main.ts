// 📁 backend/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT || 8080;
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 Serveur démarré sur le port ${port}`);
}

bootstrap();