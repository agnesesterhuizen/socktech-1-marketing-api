import dotenv from "dotenv";
import winston from "winston";
import { MarketingEventService } from "./services/MarketingEventService";
import { InMemoryEmailActionDataService } from "./services/EmailActionDataService";
import { DummyEmailProvider } from "./services/EmailProvider";
import { InMemoryJobRunner } from "./services/JobRunner";
import eventActions from "./data/email-event-data.json";
import { createServer } from "./server";

// config
dotenv.config();
const port = process.env.PORT;

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.simple(),
  level: "info",
});

// setup dependencies
const emailActionDataService = new InMemoryEmailActionDataService(eventActions);
const emailProvider = new DummyEmailProvider(logger);
const jobRunner = new InMemoryJobRunner(logger);
const marketingEventService = new MarketingEventService(logger, emailActionDataService, jobRunner, emailProvider);

// server
const app = createServer(logger, marketingEventService);
app.listen(port, () => logger.info(`[server]: Server is running at http://localhost:${port}`));
