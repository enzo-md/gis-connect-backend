// 📁 C:\Users\enzo\Desktop\GIS-CONNECT\backend\src\app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';

// Import des entités
import { User } from './entities/user.entity';
import { Team } from './entities/team.entity';
import { TeamMember } from './entities/team-member.entity';
import { Conversation } from './entities/conversation.entity';
import { ConversationParticipant } from './entities/conversation-participant.entity';
import { Message } from './entities/message.entity';
import { File } from './entities/file.entity';
import { ExternalAccessRule } from './entities/external-access-rule.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Team, TeamMember, Conversation, ConversationParticipant, Message, File, ExternalAccessRule],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,  // Important pour Render
        },
        extra: {
          connectionTimeoutMillis: 10000,
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}