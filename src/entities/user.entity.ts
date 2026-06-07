// 📁 backend/src/entities/user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// ✅ Exporter l'enum UserType
export enum UserType {
  INTERNAL = 'internal',
  EXTERNAL = 'external'
}

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  UserID: string;

  @Column({ unique: true, length: 255 })
  Email: string;

  @Column({ length: 100 })
  FullName: string;

  @Column({ type: 'varchar', length: 20 })
  UserType: UserType;

  @Column({ nullable: true, length: 100 })
  Company: string;

  @Column({ nullable: true, length: 100 })
  ExternalCompanyName: string;

  @Column({ length: 255, select: false })
  PasswordHash: string;

  @Column({ nullable: true, length: 500 })
  AvatarURL: string;

  @Column({ default: true })
  IsActive: boolean;

  @Column({ nullable: true, type: 'datetime' })
  LastSeen: Date;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;
}