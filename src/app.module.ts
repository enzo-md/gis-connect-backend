// 📁 backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    // Configuration des variables d'environnement
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // MongoDB - Cyclic fournit automatiquement MONGO_DB_URL
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_DB_URL') || configService.get('DATABASE_URL'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    
    AuthModule,
    UsersModule,
    FilesModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}