import axios from 'axios';

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

const omdbClient = axios.create({
    baseURL: OMDB_BASE_URL,
    params: {
        apikey: process.env.OMDB_API_KEY,
    },
});

export const searchMovies = async (searchTerm: string) => {
    const response = await omdbClient.get('/', {
        params: {
            s: searchTerm,
        },
    });
    return response.data;
};

export const getMovieDetails = async (imdbId: string) => {
    const response = await omdbClient.get('/', {
        params: {
            i: imdbId,
        },
    });
    return response.data;
}; 