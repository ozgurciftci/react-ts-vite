import axios from "axios";

const baseURL = 'https://dummyjson.com';

export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
}

export const getProducts = async ():Promise<Partial<Product[]>> => {
    const res = await axios.get(`${baseURL}/products`);
    return await res.data?.products as Partial<Product[]>;
}
