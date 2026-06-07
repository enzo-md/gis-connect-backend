// 📁 backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatGateway } from './gateways/chat.gateway';
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
  imports: [FilesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // Récupération avec validation stricte
        const host = configService.get<string>('DB_HOST');
        const portRaw = configService.get<string>('DB_PORT', '1433');
        const port = parseInt(portRaw, 10);
        const username = configService.get<string>('DB_USER');
        const password = configService.get<string>('DB_PASSWORD');
        const database = configService.get<string>('DB_DATABASE');

        console.log('🔧 Configuration DB:', { host, port, username, database });

        return {
          type: 'mssql' as const,
          host: host,
          port: port,
          username: username,
          password: password,
          database: database,
          options: {
            trustServerCertificate: true,
            encrypt: false,
          },
          entities: [User, Team, TeamMember, Conversation, ConversationParticipant, Message, File, ExternalAccessRule],
          synchronize: false,
          logging: true,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule {}