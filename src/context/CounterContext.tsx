import {createContext, ReactNode, useContext, useState} from "react";

interface CounterContextProps {
    counter: number
    increment: () => void
    decrement: () => void
}


export const CounterContext = createContext<CounterContextProps | undefined>(undefined)

export const useCounterContext = ()=>{
    const context = useContext(CounterContext);
    if(!context){
        throw new Error("useCounterContext must be used within a CounterProvider");
    }
    return context;
}

export const CounterProvider = ({children}: { children: ReactNode }) => {
    const [counter, setCounter] = useState(0)
    const increment = () => {
        setCounter((prevCounter:number)=> prevCounter + 1);
    }
    const decrement = () => {
        setCounter((prevCounter:number)=> prevCounter - 1);
    }
    return (
        <CounterContext.Provider value={{counter, increment, decrement}}>
            {children}
        </CounterContext.Provider>
    )
}
