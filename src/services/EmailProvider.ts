import { Logger } from "winston";
import { sendEmail } from "../integrations/send-email";

const emailTemplate = (address: string, subject: string, body: string) => `
to: ${address}
subject: ${subject}
---
${body}
`;

export interface EmailProvider {
  sendEmail(address: string, subject: string, body: string): Promise<void>;
}

export class DummyEmailProvider implements EmailProvider {
  logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }
  async sendEmail(address: string, subject: string, body: string): Promise<void> {
    const success = await sendEmail();
    if (!success) {
      throw new Error("FAILED_TO_SEND_EMAIL");
    }

    this.logger.debug("email sent:");
    this.logger.debug(emailTemplate(address, subject, body));
  }
}
