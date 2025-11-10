import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  // Looking to send emails in production? Check out our Email API/SMTP product!
  private transporter = nodemailer.createTransport(
    process.env.MAIL_PROVIDER === 'gmail'
      ? {
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        }
      : {
          host: 'sandbox.smtp.mailtrap.io',
          port: 2525,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        },
  );

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    await this.transporter.sendMail({
      from: `"KimaLink" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });
  }
}

// Configuração do Nodemailer
// const transportador = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     porta: 587,
//     autorização: {
//         usuário: 'lisa.smith@ethereal.email',
//         passe: 'SyHM6ZbyhY1Cyq4ymJ'
//     }
// });
