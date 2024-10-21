import {PropsWithChildren, ReactElement} from "react";
import {render, RenderOptions} from "@testing-library/react";
import {Providers} from "../context/Providers.tsx";
import {MemoryRouter} from "react-router-dom";

export const renderWithProviders = (
    ui: ReactElement,
    // renderOptions?: Omit<RenderOptions, 'wrapper'>,
    renderOptions?: RenderOptions
) => {
    const Wrapper = ({children}: PropsWithChildren) => (
        <MemoryRouter>
            <Providers>
                {children}
            </Providers>
        </MemoryRouter>
    )
return {
        ...render(ui, {wrapper: Wrapper, ...renderOptions})
    }
}
