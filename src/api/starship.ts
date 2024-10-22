import axios, {AxiosResponse} from "axios";

export interface Starship {
    name: string;
    model: string;
    starship_class: string;
    crew: string

}

interface StarshipApiResponse {
    results: Partial<Starship[]>;
}

const baseURL = 'https://swapi.dev/'
export const getStarships = async (searchParam?:string) => {
    let URL = `${baseURL}/api/starships`;
    if(searchParam) {
        URL = `${URL}/?search=${searchParam}`;
    }
    const response: AxiosResponse<StarshipApiResponse> = await axios.get(`${URL}`);
    return response.data?.results;
}

export const sendTotHQ = async (fleet: Starship[]) => {
    try {
        // Use the proxied endpoint
        const URL = `/api`;
        const response = await axios.post(URL, fleet, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            }
        });
        return response.data as AxiosResponse;
    } catch (e) {
        console.log(`error: ${(e as Error).message}`);
    }
};

