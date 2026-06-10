import { Document, Types } from 'mongoose';
export type UserDocument = User & Document;
export declare class User {
    _id?: Types.ObjectId;
    email: string;
    fullName: string;
    userType: string;
    company: string;
    externalCompanyName: string;
    passwordHash: string;
    isActive: boolean;
    lastSeen: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any, {}> & User & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<User> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
