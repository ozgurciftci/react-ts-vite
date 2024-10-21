import {ReactNode, useEffect} from "react";
import {useAuthContext} from "../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode;
}


export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const {isAuthenticated} = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return null;  // Or you can show a loader or placeholder until the redirect happens
    }
    return children;
}
