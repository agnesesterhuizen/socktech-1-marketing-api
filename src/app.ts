import express from "express";
import dotenv from "dotenv";
import winston from "winston";
import { requestLoggerMiddleware } from "./server/middleware";
import { MarketingEventService } from "./services/MarketingEventService";
import { InMemoryEventActionsDataStore } from "./services/EventDataStore";
import { DummyEmailProvider } from "./services/EmailProvider";
import { InMemoryJobRunner } from "./services/JobRunner";

// config
dotenv.config();
const port = process.env.PORT;

// setup dependencies
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.simple(),
  level: "debug",
});

const eventActionDataStore = new InMemoryEventActionsDataStore();
const emailProvider = new DummyEmailProvider();
const jobRunner = new InMemoryJobRunner();
const marketingEventService = new MarketingEventService(logger, eventActionDataStore, jobRunner, emailProvider);

// server
const app = express();

app.use(requestLoggerMiddleware(logger));
app.use(express.json());

app.post("/event", async (req, res) => {
  logger.debug(JSON.stringify(req.body));

  try {
    await marketingEventService.triggerEvent();
  } catch (error) {
    logger.error("triggerEvent failed:", error);
    res.sendStatus(500);
    return;
  }

  res.sendStatus(200);
});

app.listen(port, () => logger.info(`[server]: Server is running at http://localhost:${port}`));
