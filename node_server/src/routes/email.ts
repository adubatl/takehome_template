import { Router, Request, Response } from 'express';
import { sendEmail, SendEmailRequest } from '../services/resend';

const router = Router();

// Test endpoint for sending a hello world email
router.post('/test', async (req: Request, res: Response) => {
    try {
        const testEmail = req.body.email; // Get email from request body
        if (!testEmail) {
            return res.status(400).json({ error: 'Email address is required' });
        }

        const { data, error } = await sendEmail({
            to: testEmail,
            subject: 'Hello World Test Email',
            html: `
                <h1>Hello World!</h1>
                <p>This is a test email from your application.</p>
                <p>If you're seeing this, your email service is working correctly!</p>
            `,
        });

        if (error) {
            return res.status(400).json({ error });
        }

        res.status(200).json({ data, message: 'Test email sent successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send test email' });
    }
});

router.post('/send', async (req: Request<{}, {}, SendEmailRequest>, res: Response) => {
    try {
        const { to, subject, html } = req.body;
        const { data, error } = await sendEmail({ to, subject, html });

        if (error) {
            return res.status(400).json({ error });
        }

        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email' });
    }
});

export default router; 