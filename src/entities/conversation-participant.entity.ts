// 📁 GIS-CONNECT/backend/src/entities/conversation-participant.entity.ts

import { 
  Entity, 
  Column, 
  PrimaryColumn, 
  CreateDateColumn
} from 'typeorm';

export enum AccessLevel {
  FULL = 'full',
  READONLY = 'readonly',
  RESTRICTED = 'restricted'
}

@Entity('ConversationParticipants')
export class ConversationParticipant {
  @PrimaryColumn('uuid')
  ConversationID: string;

  @PrimaryColumn('uuid')
  UserID: string;

  @Column({ type: 'varchar', length: 20, default: AccessLevel.FULL })
  AccessLevel: AccessLevel;

  @CreateDateColumn()
  JoinedAt: Date;

  @Column({ nullable: true, type: 'datetime' })
  LastReadAt: Date;
}