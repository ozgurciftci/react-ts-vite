/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
import axios from "axios";

export const getUsers = async () => {
    const response = await axios.get('https://dummyjson.com/users');
    return response.data.users;
};

export const getUserById = async (id: number) => {
    const response = await axios.get(`https://dummyjson.com/users/${id}`);
    return response.data;
};

export const createUser = async (data: Partial<User>) => {
    const response = await axios.post('https://dummyjson.com/users/add', data);
    return response.data;
};

export const updateUser = async (id: number, data: Partial<User>) => {
    const response = await axios.put(`https://dummyjson.com/users/${id}`, data);
    return response.data;
};

export interface User {
    firstName: string;
    lastName: string;
    email: string;

}
