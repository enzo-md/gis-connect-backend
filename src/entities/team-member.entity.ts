// 📁 GIS-CONNECT/backend/src/entities/team-member.entity.ts

import { 
  Entity, 
  Column, 
  PrimaryColumn, 
  CreateDateColumn
} from 'typeorm';

export enum MemberRole {
  ADMIN = 'admin',
  MEMBER = 'member',
  GUEST = 'guest'
}

@Entity('TeamMembers')
export class TeamMember {
  @PrimaryColumn('uuid')
  TeamID: string;

  @PrimaryColumn('uuid')
  UserID: string;

  @Column({ type: 'varchar', length: 20, default: MemberRole.MEMBER })
  Role: MemberRole;

  @CreateDateColumn()
  JoinedAt: Date;
}