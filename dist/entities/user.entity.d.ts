export declare enum UserType {
    INTERNAL = "internal",
    EXTERNAL = "external"
}
export declare class User {
    UserID: string;
    Email: string;
    FullName: string;
    UserType: UserType;
    Company: string;
    ExternalCompanyName: string;
    PasswordHash: string;
    AvatarURL: string;
    IsActive: boolean;
    LastSeen: Date;
    CreatedAt: Date;
    UpdatedAt: Date;
}
