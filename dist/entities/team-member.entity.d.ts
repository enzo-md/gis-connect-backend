export declare enum MemberRole {
    ADMIN = "admin",
    MEMBER = "member",
    GUEST = "guest"
}
export declare class TeamMember {
    TeamID: string;
    UserID: string;
    Role: MemberRole;
    JoinedAt: Date;
}
