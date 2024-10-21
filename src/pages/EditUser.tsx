/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-argument */
import {useParams, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {getUserById, updateUser, User} from '../api/users';
import {UserForm} from '../components/UserForm';

export const EditUser = () => {
    const {id} = useParams<{ id: string }>();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUserById(Number(id));
            setUser(data);
        };
        void fetchUser();
    }, [id]);

    const handleUpdate = async (data: Partial<User>) => {
        await updateUser(Number(id), data);
        navigate('/users-list');
    };

    // Wrap the async function in a synchronous function to avoid ESLint warnings
    const handleUpdateWrapper = (data: Partial<User>) => {
        handleUpdate(data).catch((error) => console.error(error));
    };

    return user ? <UserForm onSubmit={handleUpdateWrapper} defaultValues={user}/> : <div>Loading...</div>;
};
