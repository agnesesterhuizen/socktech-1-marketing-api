import { Request, Response } from "express";
import { Logger } from "winston";
import { MarketingEvent, MarketingEventService } from "../services/MarketingEventService";
import { isValidEmail } from "../utils/email";

export const postEventRequestHandler =
  (logger: Logger, marketingEventService: MarketingEventService) =>
  async (req: Request<{}, {}, MarketingEvent>, res: Response) => {
    logger.debug(JSON.stringify(req.body));

    if (!req.body.eventName || !isValidEmail(req.body.userEmail)) {
      res.sendStatus(400);
      return;
    }

    try {
      await marketingEventService.triggerEvent(req.body);
    } catch (error) {
      logger.error("triggerEvent failed:", error);
      res.sendStatus(500);
      return;
    }

    res.sendStatus(200);
  };
