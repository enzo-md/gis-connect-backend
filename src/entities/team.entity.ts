// 📁 GIS-CONNECT/backend/src/entities/team.entity.ts

import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn
} from 'typeorm';

@Entity('Teams')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  TeamID: string;

  @Column({ length: 100 })
  TeamName: string;

  @Column({ nullable: true, length: 500 })
  Description: string;

  @Column({ name: 'OwnerID' })
  OwnerID: string;

  @Column({ default: false })
  IsExternalTeam: boolean;

  @CreateDateColumn()
  CreatedAt: Date;
}