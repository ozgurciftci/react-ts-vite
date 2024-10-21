import {Counter} from "./Counter.tsx";
import {fireEvent, screen} from '@testing-library/react';
import {renderWithProviders} from "../utils/test-utils.tsx";

describe('Counter', () => {
    test('renders correctly', () => {
        renderWithProviders(<Counter />);
        const countDisplay = screen.getByTestId('counter-test-id');
        expect(countDisplay).toBeInTheDocument();
        expect(countDisplay.textContent).toBe('0')
    })
    test('increment and decrement correctly', () => {
        renderWithProviders(<Counter />);
        const countDisplay = screen.getByTestId('counter-test-id');
        const decrementButton = screen.getByText('Decrement Counter');
        const incrementButton = screen.getByText('Increment Counter');
        fireEvent.click(decrementButton);
        fireEvent.click(decrementButton);
        expect(countDisplay.textContent).toBe('-2')
        fireEvent.click(incrementButton);
        fireEvent.click(incrementButton);
        expect(countDisplay.textContent).toBe('0')
    })
})
