import { Box, Toolbar } from "@mui/material";
import { Navbar } from './NavBar.tsx';
import { useLocation } from "react-router-dom";
import {FC, ReactNode} from "react";


interface AppLayoutProps {
    children: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
    const location = useLocation();

    // Check if the current page is the login page
    const isLoginPage = location.pathname === "/login";

    return (
        <Box>
            {/* Only render Navbar if it's not the login page */}
            {!isLoginPage && <Navbar />}
            {/* Add Toolbar spacer only if there's a Navbar */}
            {!isLoginPage && <Toolbar />}
            <Box
                component="main"
                sx={{
                    padding: isLoginPage ? 0 : 3,
                    minHeight: isLoginPage ? '100vh' : 'auto',
                    overflow: isLoginPage ? 'hidden' : 'auto'
                }}
            >
                {children}
            </Box>
        </Box>
    );
};
