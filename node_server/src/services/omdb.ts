import axios, { AxiosError } from 'axios';

if (!process.env.OMDB_API_KEY) {
    throw new Error('OMDB_API_KEY is required');
}

const OMDB_BASE_URL = 'http://www.omdbapi.com';

export interface MovieSearchResult {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface MovieDetails extends MovieSearchResult {
    Plot: string;
    Director: string;
    Actors: string;
    Rating: string;
}

export interface SearchResponse {
    Search?: MovieSearchResult[];
    totalResults?: string;
    Response: string;
}

const omdbClient = axios.create({
    baseURL: OMDB_BASE_URL,
    params: {
        apikey: process.env.OMDB_API_KEY,
    },
    timeout: 5000 // 5 second timeout
});

export const searchMovies = async (searchTerm: string) => {
    try {
        const response = await omdbClient.get('/', {
            params: {
                s: searchTerm,
            },
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (!error.response) {
                console.error('❌ OMDB API is unreachable:', error.message);
                throw new Error('OMDB service is currently unavailable');
            }
            if (error.response.status === 401 || error.response.status === 403) {
                console.error('❌ OMDB API key is invalid or expired');
                throw new Error('OMDB authentication failed');
            }
            console.error(`❌ OMDB API error (${error.response.status}):`, error.response.data);
            throw new Error(`OMDB service error: ${error.response.status}`);
        }
        throw error;
    }
};

export const getMovieDetails = async (imdbId: string) => {
    try {
        const response = await omdbClient.get('/', {
            params: {
                i: imdbId,
            },
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (!error.response) {
                console.error('❌ OMDB API is unreachable:', error.message);
                throw new Error('OMDB service is currently unavailable');
            }
            if (error.response.status === 401 || error.response.status === 403) {
                console.error('❌ OMDB API key is invalid or expired');
                throw new Error('OMDB authentication failed');
            }
            console.error(`❌ OMDB API error (${error.response.status}):`, error.response.data);
            throw new Error(`OMDB service error: ${error.response.status}`);
        }
        throw error;
    }
}; 