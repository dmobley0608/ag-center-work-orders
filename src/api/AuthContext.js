import { createContext, useContext, useState } from "react";
import { logoutSession, verifyLoggedIn } from "./api";

export const AuthContext = createContext();
export const useAuth = ()=>useContext(AuthContext);

export default function AuthProvider({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const login = async()=>{
        setUser(null)
        const res = await verifyLoggedIn();
        if(res.status === 200){
            setUser(res.data)
            setIsAuthenticated(true)
            return true
        }else{
            return false;
        }
    }

    const logout = async()=>{
        setIsLoading(true)
        await logoutSession()
        setUser(null);
        setIsAuthenticated(false)
        setIsLoading(false)
    }

    

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, user, isLoading, setIsLoading}}>
            {children}
        </AuthContext.Provider>
    )
}