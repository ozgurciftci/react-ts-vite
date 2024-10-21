import {ProductList} from "./ProductList.tsx";
import {renderWithProviders} from "../utils/test-utils.tsx";
import {expect, Mock, vi} from "vitest";
import {screen, waitFor} from "@testing-library/react";
import {getProducts, Product} from "../api/products.ts";

vi.mock('../api/products', () => {
    return {
        getProducts: vi.fn()
    }
});

describe('ProductList', () => {
    it('renders correctly', () => {
        renderWithProviders(<ProductList/>);
        expect(screen.getByTestId('productList')).toBeInTheDocument();
    })
    it('should load the data', async () => {
        // Mock API response for getProducts
        const mockProducts: Product[] = [{
            id: 1,
            category: 'sample-1',
            description: 'test-description-1',
            price: 10,
            title: 'test-title-1',
        }];

        (getProducts as Mock).mockResolvedValue(mockProducts)

        renderWithProviders(<ProductList/>)

        await waitFor(() => {
            const productElements = screen.getByTestId('productList');
            expect(productElements).toBeInTheDocument();
        })
        // Assert that the product title 'test-title-1' is rendered
        const productTitle = await screen.findByText('test-title-1');
        const productDescription = await screen.findByText('test-description-1');
        expect(productTitle).toBeInTheDocument();
        expect(productDescription).toBeInTheDocument();
    })
})
