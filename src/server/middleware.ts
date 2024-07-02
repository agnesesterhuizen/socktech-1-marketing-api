import { NextFunction, Request, Response } from "express";
import { Logger } from "winston";

export const requestLoggerMiddleware = (logger: Logger) => (req: Request, res: Response, next: NextFunction) => {
  res.on("finish", () => {
    if (res.statusCode >= 400) {
      logger.error(req.method, decodeURI(req.url), res.statusCode, res.statusMessage);
    } else {
      logger.info(req.method, decodeURI(req.url), res.statusCode, res.statusMessage);
    }
  });

  next();
};
