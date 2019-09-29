import settings from '../config/mail.json';
import mailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export class MailHandler {

  private hostname = settings.hostname;
  private port = settings.port;
  private transport: Mail;

  static instance: MailHandler = MailHandler.constructor();

  private constructor(){

    this.transport = mailer.createTransport({
      host: this.hostname,
      port: this.port,
      secure: false, // true for 465, false for other ports
    });

  }

  public async sendMail(from: string, to: string, subject: string, body: string): Promise<void>{

    await this.transport.sendMail({
      from: from, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: body, // plain text body
    });

  }

}