import {createTheme, Theme} from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme: Theme = createTheme({
    cssVariables: true,
    palette: {
        primary: {
            main: 'rgb(0,159,172)',
        },
        secondary: {
            main: '#1d4687',
        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;
