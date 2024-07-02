import { sendEmail } from "../integrations/send-email";

export interface EmailProvider {
  sendEmail(address: string, subject: string, body: string): Promise<void>;
}

export class DummyEmailProvider implements EmailProvider {
  async sendEmail(address: string, subject: string, body: string): Promise<void> {
    console.log("sending email", { address, subject, body });
    await sendEmail();
  }
}
