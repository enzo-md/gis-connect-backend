export declare enum MessageType {
    TEXT = "text",
    FILE = "file",
    PDF = "pdf",
    REACTION = "reaction",
    SYSTEM = "system"
}
export declare class Message {
    MessageID: string;
    ConversationID: string;
    SenderID: string;
    MessageType: MessageType;
    Content: string;
    FileID: string;
    PDFPageCount: number;
    ReplyToID: string;
    IsEdited: boolean;
    IsDeleted: boolean;
    IsPinned: boolean;
    SentAt: Date;
    EditedAt: Date;
    DeletedAt: Date;
}
