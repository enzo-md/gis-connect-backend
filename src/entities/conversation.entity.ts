// 📁 backend/src/entities/conversation.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('Conversations')
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  ConversationID: string;

  @Column({ type: 'varchar', length: 20 })
  ConversationType: string;

  @Column({ nullable: true, length: 200 })
  Name: string;

  @Column({ name: 'CreatedBy' })
  CreatedBy: string;

  @CreateDateColumn()
  CreatedAt: Date;

  @Column({ default: false })
  IsArchived: boolean;
}