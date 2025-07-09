import { ReactNode } from "react";
import { User } from "./userType";

export interface AuthContextType {
    isLoggedIn: boolean;
    currentUser: User | null;
    login: (email: string, password: string) => { success: boolean; message?: string };
    logout: () => void;
}


export interface AuthProviderProps {
    children: ReactNode; // A propriedade 'children' é do tipo ReactNode
}
