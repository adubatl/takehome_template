import { Inngest } from 'inngest';
import { searchMovies, getMovieDetails } from './omdb';
import { sendEmail } from './resend';

interface MovieSearchResult {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

interface SearchResponse {
    Search?: MovieSearchResult[];
    totalResults?: string;
    Response: string;
}

type MovieEvents = {
    'movie.watched': {
        data: {
            title: string;
            userEmail: string;
        };
    };
};

type MovieDataSuccess = {
    success: true;
    details: any;
    isExactMatch: boolean;
};

type MovieDataError = {
    success: false;
    error: 'NOT_FOUND' | 'API_ERROR';
    message: string;
};

type MovieData = MovieDataSuccess | MovieDataError;

export const inngestClient = new Inngest({ id: 'movie-service' });

export const sendMovieWatchedEvent = async (data: MovieEvents['movie.watched']['data']) => {
    return await inngestClient.send({ name: 'movie.watched', data });
};

export const movieWatchedHandler = inngestClient.createFunction(
    { id: 'send-movie-summary', name: 'Send Movie Plot Summary Email' },
    { event: 'movie.watched' },
    async ({ event, step }) => {
        const { title, userEmail } = event.data;
        const eventId = event.id;
        console.log(`📽️ [${eventId}] Processing movie.watched event for "${title}" to be sent to ${userEmail}`);

        const movieData = await step.run('fetch-movie-data', async () => {
            try {
                console.log(`🔍 [${eventId}] Searching for movie with title: "${title}"`);
                const results = await searchMovies(title) as SearchResponse;

                if (!results.Search?.length) {
                    console.log(`❌ [${eventId}] No match found, trying fuzzy search...`);
                    const significantWord = title.split(' ')
                        .find((word: string) => word.length > 3) || title.split(' ')[0];

                    console.log(`🔍 [${eventId}] Trying fuzzy search with: "${significantWord}"`);
                    const fuzzyResults = await searchMovies(significantWord) as SearchResponse;

                    if (!fuzzyResults.Search?.length) {
                        console.log(`❌ [${eventId}] No movies found for fuzzy search`);
                        return {
                            success: false,
                            error: 'NOT_FOUND',
                            message: `No movies found similar to: ${title}`
                        } as MovieDataError;
                    }

                    const details = await getMovieDetails(fuzzyResults.Search[0].imdbID);
                    console.log(`✨ [${eventId}] Found similar movie: "${details.Title}" (${details.Year})`);
                    return { success: true, details, isExactMatch: false } as MovieDataSuccess;
                }

                const exactMatch = results.Search.find(
                    (movie: MovieSearchResult) => movie.Title.toLowerCase() === title.toLowerCase()
                );

                if (exactMatch) {
                    const details = await getMovieDetails(exactMatch.imdbID);
                    console.log(`✅ [${eventId}] Found exact match: "${details.Title}" (${details.Year})`);
                    return { success: true, details, isExactMatch: true } as MovieDataSuccess;
                }

                const details = await getMovieDetails(results.Search[0].imdbID);
                console.log(`📝 [${eventId}] Using closest match: "${details.Title}" (${details.Year})`);
                return { success: true, details, isExactMatch: false } as MovieDataSuccess;

            } catch (error: unknown) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                console.error(`❌ [${eventId}] Error during movie search: ${errorMessage}`);
                return {
                    success: false,
                    error: 'API_ERROR',
                    message: `Error searching for movie: ${errorMessage}`
                } as MovieDataError;
            }
        });

        const emailResult = await step.run('send-email', async () => {
            if (movieData.success) {
                console.log(`📧 [${eventId}] Sending movie summary email for "${movieData.details.Title}"`);
                return await sendEmail({
                    to: userEmail,
                    subject: `Movie Summary: ${movieData.details.Title} (${movieData.details.Year})`,
                    html: `
                        <h1>${movieData.details.Title}</h1>
                        ${!movieData.isExactMatch ?
                            `<p><em>Note: We couldn't find an exact match for "${title}", 
                            so we're showing you details for a similar movie.</em></p>` : ''}
                        <img src="${movieData.details.Poster}" alt="${movieData.details.Title} poster" style="max-width: 200px;">
                        <h2>Plot Summary</h2>
                        <p>${movieData.details.Plot}</p>
                        <h3>Additional Details</h3>
                        <ul>
                            <li><strong>Director:</strong> ${movieData.details.Director}</li>
                            <li><strong>Actors:</strong> ${movieData.details.Actors}</li>
                            <li><strong>Rating:</strong> ${movieData.details.Rating}</li>
                            <li><strong>Year:</strong> ${movieData.details.Year}</li>
                        </ul>
                    `
                });
            }

            console.log(`📧 [${eventId}] Sending error notification email`);
            const errorTemplate = movieData.error === 'NOT_FOUND'
                ? `
                    <h1>Movie Not Found</h1>
                    <p>We're sorry, but we couldn't find any movies matching or similar to "${title}".</p>
                    <p>Please try again with:</p>
                    <ul>
                        <li>Check the spelling of the movie title</li>
                        <li>Try using the main word from the title</li>
                        <li>Include the year if you know it</li>
                    </ul>
                `
                : `
                    <h1>Error Processing Movie Request</h1>
                    <p>We encountered an error while processing your request for "${title}".</p>
                    <p>Please try again later. If the problem persists, try with a different movie title.</p>
                `;

            return await sendEmail({
                to: userEmail,
                subject: `Movie Request Update: ${title}`,
                html: errorTemplate
            });
        });

        const result = {
            success: movieData.success,
            title,
            matchedTitle: movieData.success ? movieData.details.Title : null,
            error: !movieData.success ? movieData.message : null,
            eventId
        };

        console.log(`🎬 [${eventId}] Completed processing with result:`, result);
        return result;
    }
);

export const inngestFunctions = [movieWatchedHandler];