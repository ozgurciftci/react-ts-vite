import {Counter} from "../components/Counter.tsx";
import {CounterProvider} from "../context/CounterContext.tsx";

export const HomePage = () => {
return (
    <CounterProvider>
        <Counter />
    </CounterProvider>
    )
}
