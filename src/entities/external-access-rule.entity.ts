// 📁 GIS-CONNECT/backend/src/entities/external-access-rule.entity.ts

import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('ExternalAccessRules')
export class ExternalAccessRule {
  @PrimaryGeneratedColumn('uuid')
  RuleID: string;

  @Column({ name: 'ExternalUserID' })
  ExternalUserID: string;

  @Column({ name: 'ConversationID' })
  ConversationID: string;

  @Column({ default: true })
  CanSendMessages: boolean;

  @Column({ default: false })
  CanUploadFiles: boolean;

  @Column({ default: false })
  CanViewHistory: boolean;

  @Column({ nullable: true, type: 'datetime' })
  ExpiresAt: Date;

  @Column({ name: 'CreatedBy' })
  CreatedBy: string;
}