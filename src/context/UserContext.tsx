/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {createContext, ReactNode, useCallback, useEffect, useState} from "react";
import {getUsers} from "../api/users.ts";

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

interface UserContextProps {
    users: User[];
    fetchUsers: () => Promise<void>;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);


export const UserProvider = ({children}: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = useCallback(async () => {
        const data = await getUsers();
        setUsers(data as User[]);
    }, []);

    useEffect(() => {
        void fetchUsers();
    }, [fetchUsers]);

    return (
        <UserContext.Provider value={{users, fetchUsers}}>
            {children}
        </UserContext.Provider>
    );
};
