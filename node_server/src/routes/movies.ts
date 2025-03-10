import { Router, Request, Response } from 'express';
import { searchMovies, getMovieDetails } from '../services/omdb';
import { sendMovieWatchedEvent } from '../services/inngest';

const router = Router();

router.get('/test/:title', async (req: Request, res: Response) => {
    try {
        const movieTitle = req.params.title;
        console.log(`🔍 Testing movie search for: "${movieTitle}"`);

        const searchResults = await searchMovies(movieTitle);

        if (!searchResults.Search || searchResults.Search.length === 0) {
            console.log(`❌ No movies found for title: "${movieTitle}"`);
            return res.status(404).json({ error: 'No movies found with that title' });
        }

        const movieDetails = await getMovieDetails(searchResults.Search[0].imdbID);
        console.log(`✅ Found movie details for: "${movieDetails.Title}"`);

        res.json({
            message: 'Movie found successfully!',
            movie: movieDetails
        });
    } catch (error) {
        console.error(`❌ Error fetching movie: ${error}`);
        res.status(500).json({ error: 'Failed to fetch movie' });
    }
});

router.get('/search', async (req: Request, res: Response) => {
    try {
        const searchTerm = req.query.q as string;
        if (!searchTerm) {
            return res.status(400).json({ error: 'Search term is required' });
        }

        console.log(`🔍 Searching for movies matching: "${searchTerm}"`);
        const results = await searchMovies(searchTerm);
        console.log(`✅ Found ${results.Search?.length || 0} results`);
        res.json(results);
    } catch (error) {
        console.error(`❌ Error searching movies: ${error}`);
        res.status(500).json({ error: 'Failed to search movies' });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const movieId = req.params.id;
        console.log(`🎬 Fetching details for movie ID: ${movieId}`);
        const movie = await getMovieDetails(movieId);
        console.log(`✅ Retrieved details for: "${movie.Title}"`);
        res.json(movie);
    } catch (error) {
        console.error(`❌ Error fetching movie details: ${error}`);
        res.status(500).json({ error: 'Failed to fetch movie details' });
    }
});

router.post('/watch', async (req: Request, res: Response) => {
    try {
        const { title, userEmail } = req.body;

        if (!title || !userEmail) {
            console.log('❌ Missing required fields in watch request');
            return res.status(400).json({
                error: 'Both title and userEmail are required'
            });
        }

        console.log(`📽️ Triggering movie.watched event for "${title}" to ${userEmail}`);

        // Send the event using the typed function
        await sendMovieWatchedEvent({
            title,
            userEmail
        });

        console.log('✅ Successfully triggered movie.watched event');
        res.json({
            message: 'Movie watched event triggered successfully',
            title,
            userEmail
        });
    } catch (error) {
        console.error(`❌ Error triggering movie.watched event:`, error);
        res.status(500).json({ error: 'Failed to trigger movie watched event' });
    }
});

export default router;