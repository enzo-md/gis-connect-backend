import { UserType } from '../entities/user.entity';
export declare class RegisterDto {
    email: string;
    fullName: string;
    password: string;
    userType: UserType;
    company?: string;
    externalCompanyName?: string;
}
