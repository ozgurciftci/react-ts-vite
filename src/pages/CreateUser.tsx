import { useNavigate } from 'react-router-dom';
import {createUser, User} from '../api/users';
import { UserForm } from '../components/UserForm';

export const CreateUser = () => {
    const navigate = useNavigate();

    const handleCreate = async (data: Partial<User>) => {
        await createUser(data); // Perform the async operation
        navigate('/users-list'); // Navigate after user creation
    };

    // Wrap the async function in a synchronous function to avoid ESLint warnings
    const handleSubmitWrapper = (data: Partial<User>) => {
        handleCreate(data).catch((error) => console.error(error));
    };

    return <UserForm onSubmit={handleSubmitWrapper} />;
};
