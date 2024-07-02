import express from "express";
import dotenv from "dotenv";
import winston from "winston";
import { requestLoggerMiddleware } from "./server/middleware";

// config
dotenv.config();
const port = process.env.PORT;

// setup dependencies
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.simple(),
  level: "debug",
});

// server
const app = express();

app.use(requestLoggerMiddleware(logger));

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => logger.info(`[server]: Server is running at http://localhost:${port}`));
