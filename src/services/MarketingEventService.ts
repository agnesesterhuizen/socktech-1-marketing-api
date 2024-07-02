import { Logger } from "winston";
import { EmailProvider } from "./EmailProvider";
import { EmailActionDataService } from "./EmailActionDataService";
import { JobRunner } from "./JobRunner";

export const MARKETING_EMAIL_JOB_NAME = "MARKETING_EMAIL_JOB";

export interface EmailJobData {
  address: string;
  subject: string;
  body: string;
}

export interface MarketingEvent {
  eventName: string;
  userEmail: string;
}

// Coordinates validating events, fetching and triggering actions
export class MarketingEventService {
  logger: Logger;
  emailActionStore: EmailActionDataService;
  jobRunner: JobRunner;
  emailProvider: EmailProvider;

  constructor(
    logger: Logger,
    emailActionStore: EmailActionDataService,
    jobRunner: JobRunner,
    emailProvider: EmailProvider
  ) {
    this.logger = logger;
    this.emailActionStore = emailActionStore;
    this.jobRunner = jobRunner;
    this.emailProvider = emailProvider;

    // register job that sends emails
    this.jobRunner.registerJob<EmailJobData>({
      name: MARKETING_EMAIL_JOB_NAME,
      process: async ({ address, subject, body }) => this.emailProvider.sendEmail(address, subject, body),
    });
  }

  async triggerEvent(event: MarketingEvent) {
    this.logger.debug("event:", event);

    // fetch actions from data store
    const actions = await this.emailActionStore.getActions(event.eventName);
    if (actions.length === 0) {
      throw "no actions for event defined";
    }

    // queue up a job to send email for each action
    actions.forEach(async (action) => {
      this.logger.debug("triggering action:", action);

      const { subject, body, delaySeconds } = action;
      const data = { address: event.userEmail, subject, body };
      const jobOptions = { delaySeconds };

      await this.jobRunner.triggerJob(MARKETING_EMAIL_JOB_NAME, data, jobOptions);
    });
  }
}
