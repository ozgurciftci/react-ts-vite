import {useAuthContext} from "../context/AuthContext.tsx";
import * as yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useState} from "react";
import {Box, Button, TextField, Typography, Paper, Avatar} from "@mui/material";
import loginBgImage from '../assets/login-bg.jpg';
import logo from '../assets/apptrak_logo.svg';

interface LoginFormInputs {
    username: string;
    password: string;
}

// Login schema
const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string()
        .min(12, 'Password must be at least 12 characters')
        .required('Password is required')
        // .matches(/[a-z]+/, "At least one lowercase character")
        // .matches(/[A-Z]+/, "At least one uppercase character")
        // .matches(/[!@#%&€£$^*()+_-]+/, "At least one special character")
        // .matches(/\d+/, "At least one number")
})

export const LoginPage = () => {
    const {loginUser} = useAuthContext();
    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormInputs>({
        resolver: yupResolver(schema),
    });
    const [errorMessage, setErrorMessage] = useState('');
    const onSubmit = async (data: LoginFormInputs) => {
        try {
            const response = await loginUser(data.username, data.password);
            console.log('Login response: ', response);
        } catch (error: unknown) {
            console.log(error);
            setErrorMessage(`Invalid email or password`);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                overflow: 'hidden',
                backgroundImage: `url(${loginBgImage})`, // Use an actual background image URL here
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    maxWidth: {xs: '90%', sm: '400px'}, // Adjust width for smaller screens
                    padding: {xs: '20px', sm: '40px'}, // Responsive padding
                    borderRadius: '8px',
                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }}
            >
                {/* Logo at the top */}
                <Avatar
                    src={logo} // Replace with the actual logo URL
                    alt="Logo"
                    sx={{
                        width: 80,
                        height: 80,
                        margin: '0 auto 20px',
                    }}
                />

                <Typography variant="h4" sx={{fontWeight: 'bold', color: '#333', marginBottom: '20px'}}>
                    Login
                </Typography>
                {errorMessage && (
                    <Typography color="error" sx={{marginBottom: '10px'}}>
                        {errorMessage}
                    </Typography>
                )}
                <form onSubmit={(event) => {
                    void handleSubmit(onSubmit)(event)
                }}>
                    <Box sx={{marginBottom: '15px'}}>
                        <TextField
                            label="Username"
                            fullWidth
                            {...register('username')}
                            error={!!errors.username}
                            helperText={errors.username?.message}
                            variant="standard"
                        />
                    </Box>
                    <Box sx={{marginBottom: '15px'}}>
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            {...register('password')}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            variant="standard"
                        />
                    </Box>
                    <Button type="submit" variant="contained" fullWidth sx={{
                        marginTop: '20px',
                        padding: '10px 0',
                        borderRadius: '30px',
                        background: 'linear-gradient(90deg, #00dbde, #fc00ff, #00dbde)',
                        backgroundSize: '200% 100%',
                        backgroundPosition: '0% 0%',
                        color: '#fff',
                        fontWeight: 'bold',
                        transition: 'background-position 0.4s ease',
                        '&:hover': {
                            backgroundPosition: '100% 0',
                            boxShadow: '0px 4px 15px rgba(252, 0, 255, 0.5)',
                        },
                    }}>
                        Login
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};
