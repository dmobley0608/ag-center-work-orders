import { createContext, useContext, useState } from "react";
import { verifyLoggedIn } from "./api";

export const AuthContext = createContext();
export const useAuth = ()=>useContext(AuthContext);

export default function AuthProvider({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const login = async()=>{
        const res = await verifyLoggedIn();
        if(res.status === 200){
            setUser(res.data)
            setIsAuthenticated(true)
            return true
        }else{
            return false;
        }
    }

    const logout = ()=>{
        setUser(null);
        setIsAuthenticated(false)
    }

    

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, user, isLoading, setIsLoading}}>
            {children}
        </AuthContext.Provider>
    )
}