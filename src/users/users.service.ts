// 📁 backend/src/users/users.service.ts

import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserType } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    if (userData.PasswordHash) {
      const salt = await bcrypt.genSalt(10);
      userData.PasswordHash = await bcrypt.hash(userData.PasswordHash, salt);
    }

    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { Email: email },
      select: ['UserID', 'Email', 'FullName', 'PasswordHash', 'UserType', 'Company', 'ExternalCompanyName', 'IsActive', 'CreatedAt'],
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { UserID: id },
    });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);
    
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async updateLastSeen(userId: string): Promise<void> {
    await this.usersRepository.update(userId, { 
      LastSeen: new Date() 
    } as any);
  }

  // ✅ Correction : Utiliser l'enum UserType
  async findAllInternal(): Promise<User[]> {
    return this.usersRepository.find({
      where: { UserType: UserType.INTERNAL, IsActive: true },
    });
  }

  // ✅ Correction : Utiliser l'enum UserType
  async findAllExternal(): Promise<User[]> {
    return this.usersRepository.find({
      where: { UserType: UserType.EXTERNAL, IsActive: true },
    });
  }
}