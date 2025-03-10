import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is required');
}

export const resendClient = new Resend(process.env.RESEND_API_KEY);

export interface SendEmailRequest {
    to: string;
    subject: string;
    html: string;
}

export const sendEmail = async ({ to, subject, html }: SendEmailRequest) => {
    return resendClient.emails.send({
        from: 'onboarding@resend.dev',
        to,
        subject,
        html,
    });
}; 