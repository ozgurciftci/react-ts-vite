import {AuthProvider} from "./AuthContext.tsx";
import {ThemeProvider} from "@mui/material/styles";
import theme from "../theme.tsx";
import {UserProvider} from "./UserContext.tsx";
import {ReactNode} from "react";
import {CounterProvider} from "./CounterContext.tsx";
import {ProductProvider} from "./ProductContext.tsx";

export const Providers = ({children}: { children: ReactNode }) => {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <UserProvider>
                    <ProductProvider>
                        <CounterProvider>
                            {children}
                        </CounterProvider>
                    </ProductProvider>
                </UserProvider>
            </ThemeProvider>
        </AuthProvider>

    )
}