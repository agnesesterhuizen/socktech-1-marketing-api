import request from "supertest";
import winston from "winston";
import { createServer } from ".";
import { InMemoryEmailActionDataService } from "../services/EmailActionDataService";
import { DummyEmailProvider } from "../services/EmailProvider";
import { MarketingEventService } from "../services/MarketingEventService";
import { MockJobRunner } from "../tests/mocks";

const createTestServer = () => {
  const logger = winston.createLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.simple(),
    level: "debug",
  });

  logger.silent = true;

  const testActions = { ["socksPurchased"]: [{ subject: "Payment received", body: "Thank you!" }] };

  const eventActionDataStore = new InMemoryEmailActionDataService(testActions);
  const emailProvider = new DummyEmailProvider(logger);
  const jobRunner = new MockJobRunner();

  const marketingEventService = new MarketingEventService(logger, eventActionDataStore, jobRunner, emailProvider);

  const app = createServer(logger, marketingEventService);

  return app;
};

describe("POST /email", () => {
  test("returns 200 for valid event", async () => {
    const app = createTestServer();

    const response = await request(app)
      .post("/event")
      .send({ eventName: "socksPurchased", userEmail: "test@healthtech1.uk" })
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
  });

  test("returns 400 event with empty email", async () => {
    const app = createTestServer();

    const response = await request(app)
      .post("/event")
      .send({ eventName: "socksPurchased", userEmail: "" })
      .set("Accept", "application/json");

    expect(response.status).toEqual(400);
  });

  test("returns 400 event with invalid email", async () => {
    const app = createTestServer();

    const response = await request(app)
      .post("/event")
      .send({ eventName: "socksPurchased", userEmail: "invalid email" })
      .set("Accept", "application/json");

    expect(response.status).toEqual(400);
  });
});
