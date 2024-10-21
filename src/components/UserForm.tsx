import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {TextField, Button, Box, Container} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import {User} from "../api/users.ts";
import {FormEvent} from "react";
import Typography from "@mui/material/Typography";

interface UserFormProps {
    onSubmit: (data: Partial<User>) => void;
    defaultValues?: Partial<User>;
}

const schema = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email().required('Email is required'),
}).required();

export const UserForm = ({onSubmit, defaultValues}: UserFormProps) => {
    const {register, handleSubmit, formState: {errors}} = useForm<User>({
        resolver: yupResolver(schema),
        defaultValues: defaultValues as User,
    });
    // Create a wrapper function to avoid the promise-returning issue
    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSubmit(onSubmit)().catch(error => console.log(error));  // Call handleSubmit but don't return the promise
    };
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',  // Centers the table horizontally
            alignItems: 'center',      // Centers the content vertically if needed
            minHeight: '100vh',        // Ensures full viewport height
            padding: '20px',
            backgroundColor: '#f9f9f9',  // Add some background to visually separate
        }}>
            <Container maxWidth="md">
                {/* Form Title */}
                <Typography variant="h4" sx={{marginBottom: '20px', textAlign: 'center'}}>
                    Create a New User
                </Typography>

                {/* Form Fields */}
                <form onSubmit={handleFormSubmit}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={{xs: 12, sm: 6}}>
                            <TextField
                                fullWidth
                                label="First Name"
                                {...register('firstName')}
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                            />
                        </Grid2>
                        <Grid2 size={{xs: 12, sm: 6}}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                {...register('lastName')}
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                            />
                        </Grid2>
                        <Grid2 size={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                {...register('email')}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid2>
                        <Grid2 size={12}>
                            {/* Submit Button */}
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{padding: '10px'}}
                            >
                                Submit
                            </Button>
                        </Grid2>
                    </Grid2>
                </form>
            </Container>
        </Box>
    );
};
