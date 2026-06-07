export declare enum AccessLevel {
    FULL = "full",
    READONLY = "readonly",
    RESTRICTED = "restricted"
}
export declare class ConversationParticipant {
    ConversationID: string;
    UserID: string;
    AccessLevel: AccessLevel;
    JoinedAt: Date;
    LastReadAt: Date;
}
