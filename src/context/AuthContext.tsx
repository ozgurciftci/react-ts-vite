import {createContext, ReactNode, useContext, useState} from "react";
import {login, logout} from "../api/auth.ts";
import {useNavigate} from "react-router-dom";
import {AxiosResponse} from "axios";

export interface AuthContextProps {
    isAuthenticated: boolean;
    loginUser: (email: string, password: string) => Promise<void>;
    logoutUser: (token: string) => Promise<unknown>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuthContext must be used within a AuthProvider");
    }
    return context;
}

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const loginUser = async (email: string, password: string) => {
        const response: AxiosResponse = await login(email, password);
        if (response.statusText === 'OK' && response.status === 200) {
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/home')
        } else {
            setIsAuthenticated(false);
            throw new Error(response.statusText || 'Login failed');
        }
    }
    const logoutUser = async () => {
        const response = await logout();
        console.log(response.data)
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    }
    return (
        <AuthContext.Provider value={{isAuthenticated, loginUser, logoutUser}}>
            {children}
        </AuthContext.Provider>
    )
}
