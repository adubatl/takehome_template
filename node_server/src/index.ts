import dotenv from 'dotenv';
// load these ASAP they are needed in the services we load.
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import { serve } from 'inngest/express';
import { inngestClient, inngestFunctions } from './services/inngest';
import emailRoutes from './routes/email';
import movieRoutes from './routes/movies';

console.log('\n🚀 Starting server...');
console.log('\n📝 Environment Variables Check:');
console.log('- RESEND_API_KEY:', !!process.env.RESEND_API_KEY ? '✅ Found' : '❌ Missing');
console.log('- OMDB_API_KEY:', !!process.env.OMDB_API_KEY ? '✅ Found' : '❌ Missing');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
    res.json({
        status: 'ok',
        env: {
            resend: !!process.env.RESEND_API_KEY,
            omdb: !!process.env.OMDB_API_KEY
        }
    });
});

app.use('/api/email', emailRoutes);
app.use('/api/movies', movieRoutes);

app.use('/api/inngest', serve({
    client: inngestClient,
    functions: inngestFunctions,
}));

app.listen(port, () => {
    console.log(`
🎬 Movie Service Ready!
📍 Server: http://localhost:${port}
🔗 Health Check: http://localhost:${port}/health
📧 Email Endpoints: http://localhost:${port}/api/email
🎥 Movie Endpoints: http://localhost:${port}/api/movies
🔄 Inngest Webhook: http://localhost:${port}/api/inngest
    `);
});