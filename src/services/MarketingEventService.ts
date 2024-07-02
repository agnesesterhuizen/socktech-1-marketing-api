import { Logger } from "winston";
import { EmailProvider } from "./EmailProvider";
import { EventActionsDataStore } from "./EventDataStore";
import { JobRunner } from "./JobRunner";

// Coordinates validating events, fetching and triggering actions
export class MarketingEventService {
  logger: Logger;
  eventActionStore: EventActionsDataStore;
  jobRunner: JobRunner;
  emailProvider: EmailProvider;

  constructor(
    logger: Logger,
    eventActionStore: EventActionsDataStore,
    jobRunner: JobRunner,
    emailProvider: EmailProvider
  ) {
    this.logger = logger;
    this.eventActionStore = eventActionStore;
    this.jobRunner = jobRunner;
    this.emailProvider = emailProvider;
  }

  async triggerEvent() {}
}
