import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from 'react';
import {getProducts, Product} from '../api/products.ts';

interface productContextProps {
    products: Product[],
    fetchProducts: () => Promise<void>,
}

export const ProductContext = createContext<productContextProps | undefined >(undefined);

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if(!context){
        throw new Error("useProductContext must be used within a ProductProvider");
    }
    return context;
}

export const ProductProvider = ({children}: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const fetchProducts = useCallback(async () => {
        const products = await getProducts();
        setProducts(products as Product[]);
    }, [])

    useEffect(() => {
        void fetchProducts();
    }, [fetchProducts]);
    return(
        <ProductContext.Provider value={{products, fetchProducts}}>
            {children}
        </ProductContext.Provider>
    )
}
