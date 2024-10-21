/* eslint-disable */
import axios from 'axios';

const baseURL = 'https://dummyjson.com';

export const login = async (username: string, password: string) => {
    try {
        return await axios.post(`${baseURL}/auth/login`, {username, password});
    } catch (error: any) {
        console.log(`error in login: ${error?.message}`);
        throw error;
    }
}

export const logout = async () => {
   try {
       return await axios.post(`${baseURL}/auth/logout`, {});
   } catch (error: any) {
       console.log(`error in logout: ${error?.message}`);
       throw error;
   }
}
