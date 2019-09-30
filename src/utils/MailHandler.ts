import settings from '../config/mail.json';
import mailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export class MailHandler {


  private static transport: Mail = mailer.createTransport({
    host: settings.hostname,
    port: settings.port,
    secure: false, // true for 465, false for other ports
    tls: {
      rejectUnauthorized: false
    }
  });

  public static sendMail(from: string, to: string, subject: string, body: string) {

    MailHandler.transport.sendMail({
      from: from, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: body, // plain text body
    });

  }

}