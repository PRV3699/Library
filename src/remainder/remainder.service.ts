import { getCustomRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BookUserRepository } from '../bookuser/bookuser.repository';
import { UserRepository } from '../user/user.repository';
import { BookRepository } from '../book/book.repository';
import { BookEntity } from '../book/book.entity';
import { UserEntity } from '../user/user.entity';
import { Cron } from '@nestjs/schedule';
import * as nodemailer from 'nodemailer';
interface EmailData {
  book: BookEntity;
  user: UserEntity;
}
@Injectable()
export class ReminderService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(BookRepository)
    private bookRepository: BookRepository,
  ) {}
  @Cron('* * * * *')
  async run() {
    const bookUserRepository = getCustomRepository(BookUserRepository);
    const records = await bookUserRepository.mailReceivers();
    console.log(records);
    const data = await records.map(async (record) => {
      const user = await this.userRepository.findOne({
        where: { id: record.userId },
      });
      //console.log(user);
      const book = await this.bookRepository.findOne({
        where: { id: record.bookId },
      });
      return {
        user,
        book,
      };
    });
    await data.map(async (record) => {
      await this.sendEmail(record);
    });
  }

  async sendEmail(data: Promise<EmailData>) {
    const record = await data;
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports*/
      auth: {
        user: 'madge.gutkowski44@ethereal.email', // generated ethereal user
        pass: 'mn726Gy18uJX1xucad', // generated ethereal password
      },
    });
    try {
      const info = await transporter.sendMail({
        from: 'madge.gutkowski44@ethereal.email',
        to: record.user.email,
        subject: 'Reminder for returning the book',
        text: 'Hello Reader',
        html: `<p>Hello User, you have following book to be returned
        <span>book - ${record.book.title}</span></p>`,
      });

      console.log('Message sent: %s', info.messageId);
    } catch (err) {
      console.log(err.message);
    }
  }
}
