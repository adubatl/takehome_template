require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Inngest, EventSchemas } = require('inngest');
const { serve } = require('inngest/express');
const { Resend } = require('resend');

const app = express();
const port = process.env.PORT || 3000;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Inngest
const inngest = new Inngest({ name: 'My App' });

// Define your first function
const helloWorld = inngest.createFunction(
    { name: 'Hello World' },
    { event: 'test/hello.world' },
    async ({ event, step }) => {
        await step.sleep('wait-a-moment', '1s');
        return { message: `Hello ${event.data.name}!` };
    }
);

app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Example API endpoint
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
    try {
        const { to, subject, html } = req.body;
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev', // Update this with your verified domain
            to: to,
            subject: subject,
            html: html,
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