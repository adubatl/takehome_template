import { Inngest } from 'inngest';
import { searchMovies, getMovieDetails } from './omdb';
import { sendEmail } from './resend';

export const inngestClient = new Inngest({
    id: 'my-app',
});

export interface MovieWatchedEvent {
    data: {
        title: string;
        userEmail: string;
    };
}

export const movieWatchedHandler = inngestClient.createFunction(
    { id: 'movie-watched-email', name: 'Send Movie Plot Summary Email' },
    { event: 'movie.watched' },
    async ({ event, step }) => {
        const { title, userEmail } = event.data;
        console.log(`📽️ Processing movie.watched event for "${title}" to be sent to ${userEmail}`);

        const searchResult = await step.run('search-movie', async () => {
            console.log(`🔍 Searching for movie with title: "${title}"`);
            const results = await searchMovies(title);
            if (!results.Search || results.Search.length === 0) {
                console.error(`❌ No movie found with title: "${title}"`);
                throw new Error(`No movie found with title: ${title}`);
            }
            console.log(`✅ Found movie: "${results.Search[0].Title}" (${results.Search[0].Year})`);
            return results.Search[0];
        });

        const movieDetails = await step.run('get-movie-details', async () => {
            console.log(`📑 Fetching details for movie ID: ${searchResult.imdbID}`);
            const details = await getMovieDetails(searchResult.imdbID);
            console.log(`✅ Retrieved full details for "${details.Title}"`);
            return details;
        });

        const emailResult = await step.run('send-email', async () => {
            console.log(`📧 Sending movie summary email to ${userEmail}`);
            const result = await sendEmail({
                to: userEmail,
                subject: `Movie Summary: ${movieDetails.Title} (${movieDetails.Year})`,
                html: `
                    <h1>${movieDetails.Title}</h1>
                    <img src="${movieDetails.Poster}" alt="${movieDetails.Title} poster" style="max-width: 200px;">
                    <h2>Plot Summary</h2>
                    <p>${movieDetails.Plot}</p>
                    <h3>Additional Details</h3>
                    <ul>
                        <li><strong>Director:</strong> ${movieDetails.Director}</li>
                        <li><strong>Actors:</strong> ${movieDetails.Actors}</li>
                        <li><strong>Rating:</strong> ${movieDetails.Rating}</li>
                    </ul>
                `
            });
            console.log(`✅ Email sent successfully with ID: ${result.data?.id}`);
            return result;
        });

        console.log(`🎬 Completed processing movie.watched event for "${title}"`);
        return {
            message: 'Successfully sent movie plot summary email',
            movieId: searchResult.imdbID,
            emailId: emailResult.data?.id
        };
    }
);

export const inngestFunctions = [movieWatchedHandler];