import winston from "winston";
import { MockEmailProvider } from "../tests/mocks";
import { MarketingEventService } from "./MarketingEventService";
import { EmailActionDataStore, InMemoryEmailActionDataService } from "./EmailActionDataService";
import { DummyEmailProvider, EmailProvider } from "./EmailProvider";
import { InMemoryJobRunner, JobRunner } from "./JobRunner";

describe("MarketingEventService", () => {
  test("handles marketing flow 1", () => {
    // const service = setupService();
    // const event = {
    //   eventName: "websiteSignup",
    //   userEmail: "test@healthtech1.uk",
    // };
    // service.triggerEvent(event);
  });

  // test("handles marketing flow 2", async () => {
  //   const event = {
  //     eventName: "socksPurchased",
  //     userEmail: "test@healthtech1.uk",
  //   };

  //   // no delay for this flow
  //   const actions = {
  //     [event.eventName]: [
  //       {
  //         subject: "Payment received",
  //         body: "Thank you!",
  //       },
  //       {
  //         subject: "Socks dispatched!",
  //         body: "Get ready!",
  //       },
  //     ],
  //   };

  //   const logger = winston.createLogger({
  //     transports: [new winston.transports.Console()],
  //     format: winston.format.simple(),
  //     level: "debug",
  //   });

  //   //   logger.silent = true;

  //   const emailProvider = new MockEmailProvider();
  //   const jobRunner = new InMemoryJobRunner(logger);
  //   const emailActionDataService = new InMemoryEmailActionDataService(actions);
  //   const service = new MarketingEventService(logger, emailActionDataService, jobRunner, emailProvider);

  //   const mockSendEmail = jest.spyOn(emailProvider, "sendEmail");

  //   await service.triggerEvent(event);

  //   expect(mockSendEmail).toHaveBeenCalledTimes(2);
  // }, 10000);
});
