import {getStarships, sendTotHQ, Starship} from "../api/starship.ts";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";

interface starhipContextProps {
    starships: Starship[]
    starshipFleet: Starship[]
    addToStarshipFleet: (starship: Starship) => void
    removeStarshipFleet: (starship: Starship) => void
    searchStarship: (searchParam?: string) => Promise<void>
    sendToHQ: (starshipFleet: Starship[]) => Promise<void>
}

const StarshipContext = createContext<starhipContextProps | undefined>(undefined)

export const useStarshipContext = () => {
    const context = useContext(StarshipContext);
    if (!context) {
        throw new Error("useStarshipContext must be used within a StarshipProvider");
    }
    return context;
}

export const StarshipProvider = ({children}: { children: ReactNode }) => {
    const [starships, setStarships] = useState<(Starship)[]>([]);
    const [starshipFleet, setStarshipFleet] = useState<(Starship)[]>([]);

    useEffect(() => {
        const fetchStarShip = async () => {
            const starshipList = await getStarships()
            setStarships(starshipList as Starship[]);
        }
        void fetchStarShip()
    }, [])

    const addToStarshipFleet = (starship: Starship) => {
        if(!starshipFleet.includes(starship)) {
            setStarshipFleet([...starshipFleet, starship])
        }
    }

    const removeStarshipFleet = (starship: Starship) => {
        setStarshipFleet(starshipFleet.filter((f) => f !== starship))
    }

    const searchStarship = async (searchParam?: string) => {
        const result = await getStarships(searchParam)
        setStarships(result as Starship[]);
    }

    const sendToHQ = async (starshipFleet: Starship[]) => {
        await sendTotHQ(starshipFleet);
    }

    return (
        <StarshipContext.Provider value={{starships, addToStarshipFleet, removeStarshipFleet, starshipFleet, searchStarship, sendToHQ}}>
            {children}
        </StarshipContext.Provider>
    )
}
