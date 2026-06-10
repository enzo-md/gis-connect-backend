// 📁 backend/src/users/users.service.ts

import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const existingUser = await this.userModel.findOne({ email: userData.email });
    if (existingUser) {
      throw new ConflictException('Cet email est déjà utilisé');
    }

    if (userData.passwordHash) {
      const salt = await bcrypt.genSalt(10);
      userData.passwordHash = await bcrypt.hash(userData.passwordHash, salt);
    }

    const user = new this.userModel(userData);
    return user.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    // Important : sélectionner passwordHash même s'il est caché par défaut
    const user = await this.userModel.findOne({ email }).select('+passwordHash').exec();
    console.log('Utilisateur trouvé:', user ? user.email : 'Non trouvé');
    console.log('PasswordHash présent:', user ? !!user.passwordHash : false);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    
    if (!user) {
      console.log('Utilisateur non trouvé:', email);
      return null;
    }

    if (!user.passwordHash) {
      console.log('PasswordHash manquant pour:', email);
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    console.log('Mot de passe valide:', isPasswordValid);
    
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async updateLastSeen(userId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, { lastSeen: new Date() });
  }
}