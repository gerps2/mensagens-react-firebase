import { User } from "../models/user.model";

export interface IAuthRepository {
    loginWithGoogle(): Promise<User>;
    logout(): Promise<void>;
    onAuthStateChanged(callback: (user: User | null) => void): void;
}