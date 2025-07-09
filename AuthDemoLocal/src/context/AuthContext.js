import React, { createContext, useState, useContext} from "react";
import usersData from '../data/users.json';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [currentUser, setCurrentUser] = useState(null);



        const login = (email, password) => {

            const user = usersData.find(
                (u) =>  u.email === email &&
                        u.password === password
            )

            if (user){
                setIsLoggedIn(true);
                setCurrentUser(user)
                return { success: true }; 
            } else {
                setIsLoggedIn(false);
                setCurrentUser(null);
                return { success: false, message: "Email or password wrong."}
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
        if(context === undefined) {
            throw new Error('useAuth must be user within an AuthProvider');
        }
        return context;
     }