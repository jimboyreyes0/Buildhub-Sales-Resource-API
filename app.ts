import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import connection from "./connection/db";

import mainRoute from "./routes/main.router";
import logger from "./utils/logger";
import { setHeadersMiddleware } from "./utils/cors";

dotenv.config();
const app: Express = express();
app.use(morgan("tiny"));
app.use(bodyParser.json());

app.use(setHeadersMiddleware);
app.use("/api/v1", mainRoute);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ success: false, message: "Resource unavailable." });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  logger.error(
    `Status: ${status}, Message: ${message}, Data: ${JSON.stringify(
      data
    )}, Stack: ${error.stack}`
  );

  res
    .status(status)
    .json({ success: false, message: "Please try again later." });
});

const port = process.env.PORT || 3000;

connection
  .authenticate()
  .then(() => {
    console.log("Database connected...");
    return connection.sync();
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    throw err;
  });
