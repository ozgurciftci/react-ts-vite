import {ProductProvider} from "../context/ProductContext.tsx";
import {ProductList} from "../components/ProductList.tsx";

export const ProductsPage = () => {
    return <ProductProvider>
        <ProductList/>
    </ProductProvider>
}
