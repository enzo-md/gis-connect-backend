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
    url: configService.get('DATABASE_URL'),  // ← Utiliser DATABASE_URL
    entities: [User, Team, TeamMember, Conversation, ConversationParticipant, Message, File, ExternalAccessRule],
    synchronize: true,
    ssl: { rejectUnauthorized: false },
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