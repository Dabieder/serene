import { createTestAccount, createTransport } from "nodemailer";
import logger from "../util/logger";

export class PrivacyService {
  transporter: any;
  constructor() {}

  async configureMailer() {
    const testAccount = await createTestAccount();
    logger.debug("TEST MAIL CREDENTIALS: ", testAccount);
    this.transporter = createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
  }

  async sendEMailToPrivacyOfficer(email: string, message: string) {
    const info = await this.transporter.sendMail({
      from: `"Serene Application" <serene@edutec.guru`,
      to: email,
      subject: "Remember to Monitor your Learning",
      text: "serene.edutec.guru"
    });
    logger.debug(`Sent reminder mail to: `, info);
  }
}
