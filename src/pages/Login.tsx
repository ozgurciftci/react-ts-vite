import {useAuthContext} from "../context/AuthContext.tsx";
import * as yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useState} from "react";
import {Box, Button, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";

interface LoginFormInputs {
    email: string;
    password: string;
}

// Login schema
const schema = yup.object().shape({
    email: yup.string().required('username is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
})

export const LoginPage = () => {
    const {loginUser} = useAuthContext();
    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormInputs>({
        resolver: yupResolver(schema),
    })
    const [errorMessage, setErrorMessage] = useState('');
    const onSubmit = async (data: LoginFormInputs) => {
        try {
            const response = await loginUser(data.email, data.password);  // Attempt login
            console.log('anansi login response: ', response)
        } catch (error: unknown) {
            // @ts-expect-error-ignore
            setErrorMessage(`Invalid email or password: ${error.message}`);  // Display error on failure
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                padding: '20px',
            }}
        >
            <Typography variant="h4" sx={{marginBottom: '20px'}}>
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
                        label="Email"
                        fullWidth
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
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
                    />
                </Box>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </form>
        </Box>
    )
}
