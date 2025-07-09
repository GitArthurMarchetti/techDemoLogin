import React, { createContext, useState, useContext } from "react";
import usersData from '../data/users.json';
import { AuthContextType, AuthProviderProps } from "../interfaces/authContextType";
import { User } from "../interfaces/userType";



export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);



    const login = (email: string, password: string) => {

        const user = usersData.find(
            (u) => u.email === email &&
                u.password === password
        )

        if (user) {
            setIsLoggedIn(true);
            setCurrentUser({ email: user.email })
            return { success: true };
        } else {
            setIsLoggedIn(false);
            setCurrentUser(null);
            return { success: false, message: "Email or password wrong." }
        }

    }

    const logout = () => {
        setIsLoggedIn(false)
        setCurrentUser(null);
    }


    const authContextValue = {
        isLoggedIn,
        currentUser,
        login,
        logout,
    }

    return (

        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>

    )

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be user within an AuthProvider');
    }
    return context;
}