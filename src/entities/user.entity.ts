// 📁 backend/src/entities/user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum UserType {
  INTERNAL = 'internal',
  EXTERNAL = 'external'
}

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'UserID' })
  UserID: string;

  @Column({ name: 'Email', unique: true, length: 255 })
  Email: string;

  @Column({ name: 'FullName', length: 100 })
  FullName: string;

  @Column({ name: 'UserType', type: 'varchar', length: 20 })
  UserType: UserType;

  @Column({ name: 'Company', nullable: true, length: 100 })
  Company: string;

  @Column({ name: 'ExternalCompanyName', nullable: true, length: 100 })
  ExternalCompanyName: string;

  @Column({ name: 'PasswordHash', length: 255, select: false })
  PasswordHash: string;

  @Column({ name: 'AvatarURL', nullable: true, length: 500 })
  AvatarURL: string;

  @Column({ name: 'IsActive', default: true })
  IsActive: boolean;

  // ✅ Correction : PostgreSQL utilise timestamp, pas datetime
  @Column({ name: 'LastSeen', type: 'timestamp', nullable: true })
  LastSeen: Date;

  @CreateDateColumn({ name: 'CreatedAt', type: 'timestamp' })
  CreatedAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'timestamp' })
  UpdatedAt: Date;
}