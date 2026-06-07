// 📁 backend/src/dto/register.dto.ts

import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { UserType } from '../entities/user.entity';

export class RegisterDto {
  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @IsString()
  @MinLength(2, { message: 'Le nom doit contenir au moins 2 caractères' })
  fullName: string;

  @IsString()
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
  password: string;

  @IsEnum(UserType, { message: 'Le type doit être internal ou external' })
  userType: UserType;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  externalCompanyName?: string;
}