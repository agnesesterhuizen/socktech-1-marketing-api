import express from "express";
import { Logger } from "winston";
import { requestLoggerMiddleware } from "./middleware";
import { postEventRequestHandler } from "./handlers";
import { MarketingEventService } from "../services/MarketingEventService";

export const createServer = (logger: Logger, marketingEventService: MarketingEventService) => {
  const app = express();

  app.use(requestLoggerMiddleware(logger));
  app.use(express.json());

  app.post("/event", postEventRequestHandler(logger, marketingEventService));

  return app;
};
