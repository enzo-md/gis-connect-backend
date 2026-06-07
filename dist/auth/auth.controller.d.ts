import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            fullName: string;
            userType: import("../entities/user.entity").UserType;
            company: string;
            externalCompanyName: string;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            fullName: string;
            userType: import("../entities/user.entity").UserType;
            company: string;
            externalCompanyName: string;
        };
    }>;
}
