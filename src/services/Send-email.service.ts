import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({
    region: '',
    credentials: {
        accessKeyId: '',
        secretAccessKey: '',
    },
});


export class SendEmailService {
    constructor() {}

    async send(context, emailPayload: {to: string, from: string, subject: string, content: string}): Promise<any> {
        console.log('emailPayload: ', emailPayload);

        return context.json({
            success: true,
            result: {
                data: {}
            }
        }, 201);

        const command = new SendEmailCommand({
            Source: emailPayload.from,
            Destination: {
                ToAddresses: [emailPayload.to],
            },
            Message: {
                Subject: {
                    Data: emailPayload.subject,
                },
                Body: {
                    Text: {
                        Data: emailPayload.content,
                    },
                },
            },
        });
        console.log('command: ', command);

        try {
            const response = await sesClient.send(command);
            console.log('Email sent:', response);
            return context.json({
                success: true,
                result: {
                    data: emailPayload
                }
            }, 201);
        } catch (err) {
            console.error('Error sending email:', err);
            return context.json({
                success: false,
                message: err.message,
            }, err.code || 402);
        }
    }
}