import { Logger } from "winston";
import { EmailProvider } from "./EmailProvider";
import { EmailActionDataService } from "./EmailActionDataService";
import { JobRunner } from "./JobRunner";

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
  }

  async triggerEvent(event: MarketingEvent) {
    this.logger.debug("event:", event);

    // validate email
    // TODO:

    // fetch actions from data store
    const actions = await this.emailActionStore.getActions(event.eventName);

    // trigger jobs to execute action:
    actions.forEach((action) => {
      this.logger.debug("triggering action:", action);
    });
  }
}
