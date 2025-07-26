import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import connection from "./connection/db";

import mainRoute from "./routes/main.router";
import logger from "./utils/logger";
import { setHeadersMiddleware } from "./utils/cors";
import { exceptionHandler } from "./exceptions/http.exception";

dotenv.config();
const app: Express = express();
app.use(morgan("tiny"));
app.use(bodyParser.json());

app.use(setHeadersMiddleware);
app.use("/api/v1", mainRoute);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Resource unavailable",
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
});

app.use(exceptionHandler);

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
