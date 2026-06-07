// 📁 GIS-CONNECT/backend/src/entities/message.entity.ts

import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

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

  @Column({ nullable: true, type: 'nvarchar', length: 'MAX' })
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

  @CreateDateColumn()
  SentAt: Date;

  @UpdateDateColumn({ nullable: true })
  EditedAt: Date;

  @Column({ nullable: true, type: 'datetime' })
  DeletedAt: Date;
}