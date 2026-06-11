// 📁 backend/src/auth/auth.service.ts

import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { User } from '../schemas/user.schema.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    
    const user = await this.usersService.validateUser(email, password);
    
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Compte désactivé');
    }

    const userId = user._id?.toString() || '';
    
    await this.usersService.updateLastSeen(userId);

    const payload = { 
      sub: userId,
      email: user.email, 
      userType: user.userType 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: userId,
        email: user.email,
        fullName: user.fullName,
        userType: user.userType,
        company: user.company,
        externalCompanyName: user.externalCompanyName,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const { email, fullName, password, userType, company, externalCompanyName } = registerDto;

    const userData: Partial<User> = {
      email: email,
      fullName: fullName,
      passwordHash: password,
      userType: userType,
      company: company,
      externalCompanyName: externalCompanyName,
      isActive: true,
    };

    const user = await this.usersService.create(userData);
    
    const userId = user._id?.toString() || '';

    const payload = { 
      sub: userId, 
      email: user.email, 
      userType: user.userType 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: userId,
        email: user.email,
        fullName: user.fullName,
        userType: user.userType,
        company: user.company,
        externalCompanyName: user.externalCompanyName,
      },
    };
  }

  async validateUserById(userId: string): Promise<any> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }
    return {
      id: user._id?.toString() || '',
      email: user.email,
      fullName: user.fullName,
      userType: user.userType,
    };
  }
}