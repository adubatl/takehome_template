import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is required');
}

const resendClient = new Resend(process.env.RESEND_API_KEY);

export interface SendEmailRequest {
    to: string;
    subject: string;
    html: string;
}

export const sendEmail = async ({ to, subject, html }: SendEmailRequest) => {
    try {
        const result = await resendClient.emails.send({
            from: 'onboarding@resend.dev',
            to,
            subject,
            html,
        });

        if (result.error) {
            console.error('❌ Resend API error:', result.error);
            throw new Error(`Resend service error: ${result.error.message || 'Unknown error'}`);
        }

        return result;
    } catch (error) {
        if (error instanceof Error) {
            // Check for specific Resend error patterns
            if (error.message.includes('unauthorized') || error.message.includes('invalid_api_key')) {
                console.error('❌ Resend API key is invalid or expired');
                throw new Error('Resend authentication failed');
            }
            if (error.message.includes('network') || error.message.includes('timeout')) {
                console.error('❌ Resend API is unreachable:', error.message);
                throw new Error('Resend service is currently unavailable');
            }
            console.error('❌ Resend API error:', error.message);
            throw new Error(`Resend service error: ${error.message}`);
        }
        throw error;
    }
}; 