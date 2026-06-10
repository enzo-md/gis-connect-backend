// 📁 backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { FilesModule } from './files/files.module';  ← Temporairement commenté
// import { ChatModule } from './chat/chat.module';    ← Temporairement commenté

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    
    AuthModule,
    UsersModule,
    // FilesModule,  ← Commenté
    // ChatModule,   ← Commenté
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}