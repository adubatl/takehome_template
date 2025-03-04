import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { Inngest, EventSchemas } from 'inngest';
import { serve } from 'inngest/express';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Inngest
const inngest = new Inngest({ name: 'My App' });

// Define types for the hello world event
interface HelloWorldEvent {
    name: string;
}

// Define your first function
const helloWorld = inngest.createFunction(
    { name: 'Hello World' },
    { event: 'test/hello.world' },
    async ({ event, step }) => {
        const data = event.data as HelloWorldEvent;
        await step.sleep('wait-a-moment', '1s');
        return { message: `Hello ${data.name}!` };
    }
);

// Define types for the email request
interface SendEmailRequest {
    to: string;
    subject: string;
    html: string;
}

app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok' });
});

// Example API endpoint
app.get('/api/hello', (_req: Request, res: Response) => {
    res.json({ message: 'Hello from the backend!' });
});

// Email sending endpoint
app.post('/api/send-email', async (req: Request<{}, {}, SendEmailRequest>, res: Response) => {
    try {
        const { to, subject, html } = req.body;
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev', // Update this with your verified domain
            to,
            subject,
            html,
        });

        if (error) {
            return res.status(400).json({ error });
        }

        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// Serve Inngest functions
app.use('/api/inngest', serve({
    client: inngest,
    functions: [helloWorld],
}));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 