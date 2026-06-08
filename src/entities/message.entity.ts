// 📁 backend/src/entities/message.entity.ts

import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Conversation } from './conversation.entity';
import { User } from './user.entity';

export enum MessageType {
  TEXT = 'text',
  FILE = 'file',
  PDF = 'pdf',
  REACTION = 'reaction',
  SYSTEM = 'system'
}

@Entity('Messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  MessageID: string;

  @Column({ name: 'ConversationID' })
  ConversationID: string;

  @Column({ name: 'SenderID' })
  SenderID: string;

  @Column({ type: 'varchar', length: 20 })
  MessageType: MessageType;

  @Column({ nullable: true, type: 'text' })
  Content: string;

  @Column({ name: 'FileID', nullable: true })
  FileID: string;

  @Column({ nullable: true })
  PDFPageCount: number;

  @Column({ name: 'ReplyToID', nullable: true })
  ReplyToID: string;

  @Column({ default: false })
  IsEdited: boolean;

  @Column({ default: false })
  IsDeleted: boolean;

  @Column({ default: false })
  IsPinned: boolean;

  // ✅ Un seul CreateDateColumn
  @CreateDateColumn({ type: 'timestamp' })
  SentAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  EditedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  DeletedAt: Date;

  // Relations
  @ManyToOne(() => Conversation)
  @JoinColumn({ name: 'ConversationID' })
  Conversation: Conversation;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'SenderID' })
  Sender: User;

  @ManyToOne(() => Message, { nullable: true })
  @JoinColumn({ name: 'ReplyToID' })
  ReplyTo: Message;
}