// 📁 backend/src/auth/auth.service.ts

import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { User, UserType } from '../entities/user.entity';

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

    if (!user.IsActive) {
      throw new UnauthorizedException('Compte désactivé');
    }

    await this.usersService.updateLastSeen(user.UserID);

    const payload = { 
      sub: user.UserID, 
      email: user.Email, 
      userType: user.UserType 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.UserID,
        email: user.Email,
        fullName: user.FullName,
        userType: user.UserType,
        company: user.Company,
        externalCompanyName: user.ExternalCompanyName,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const { email, fullName, password, userType, company, externalCompanyName } = registerDto;

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Cet email est déjà utilisé');
    }

    const userData: Partial<User> = {
      Email: email,
      FullName: fullName,
      PasswordHash: password,
      UserType: userType,
      Company: company,
      ExternalCompanyName: externalCompanyName,
      IsActive: true,
    };

    const user = await this.usersService.create(userData);

    const payload = { 
      sub: user.UserID, 
      email: user.Email, 
      userType: user.UserType 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.UserID,
        email: user.Email,
        fullName: user.FullName,
        userType: user.UserType,
        company: user.Company,
        externalCompanyName: user.ExternalCompanyName,
      },
    };
  }

  async validateUserById(userId: string): Promise<any> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }
    return {
      id: user.UserID,
      email: user.Email,
      fullName: user.FullName,
      userType: user.UserType,
    };
  }
}