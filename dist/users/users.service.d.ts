import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(userData: Partial<User>): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    validateUser(email: string, password: string): Promise<User | null>;
    updateLastSeen(userId: string): Promise<void>;
    findAllInternal(): Promise<User[]>;
    findAllExternal(): Promise<User[]>;
}
