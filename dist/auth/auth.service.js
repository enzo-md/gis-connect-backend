"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.usersService.validateUser(email, password);
        if (!user) {
            throw new common_1.UnauthorizedException('Email ou mot de passe incorrect');
        }
        if (!user.IsActive) {
            throw new common_1.UnauthorizedException('Compte désactivé');
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
    async register(registerDto) {
        const { email, fullName, password, userType, company, externalCompanyName } = registerDto;
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new common_1.ConflictException('Cet email est déjà utilisé');
        }
        const userData = {
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
    async validateUserById(userId) {
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('Utilisateur non trouvé');
        }
        return {
            id: user.UserID,
            email: user.Email,
            fullName: user.FullName,
            userType: user.UserType,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map