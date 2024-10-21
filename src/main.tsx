import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import {Provider} from "react-redux";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import {Provider} from "react-redux";
import {store} from "./app/store.ts";
// import {store} from "./app/store.ts";

const container = document.getElementById("root")
if (container) {
    const root = createRoot(container)
    root.render(
        <StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Provider store={store}>
                <App />
                </Provider>
            </ThemeProvider>
        </StrictMode>,
    )
} else {
    throw new Error('Root element with ID \'root\' was not found in the document. ' +
        'Ensure there is a corresponding HTML element with the ID \'root\' in your HTML file.')
}


