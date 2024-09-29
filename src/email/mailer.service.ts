import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail', // or use 'SMTP' for custom server
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'nodemailerfornest@gmail.com',
                pass: 'txrj xcyn xpio qkey',
            },
        });
    }

    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         user: 'your gmail here',
    //         pass: 'your app generated password here',
    //     },
    // });

    async sendMail(to: string, subject: string, text: string): Promise<void> {
        await this.transporter.sendMail({
            from: '"MEDXPERT" <nodemailerfornest@gmail.com>',
            to,
            subject,
            text,
        });
    }
}
