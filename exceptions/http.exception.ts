import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export class HttpException extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: any,
    public code?: string
  ) {
    super(message);
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string = "Bad Request", details?: any) {
    super(400, message, details, "BAD_REQUEST");
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string = "Internal Server Error") {
    super(500, message, undefined, "INTERNAL_SERVER_ERROR");
  }
}

export const exceptionHandler = (
  error: Error | HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error instanceof HttpException ? error.statusCode : 500;
  const message = error.message || "Something went wrong";
  const code = error instanceof HttpException ? error.code : "UNKNOWN_ERROR";
  const details = error instanceof HttpException ? error.details : undefined;

  logger.error({
    statusCode,
    message,
    code,
    details,
    stack: error.stack,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  const isProduction = process.env.NODE_ENV === "production";
  const response = {
    success: false,
    statusCode,
    message:
      isProduction && statusCode === 500 ? "Please try again later." : message,
    ...(!isProduction && { code }),
    ...(!isProduction && statusCode !== 500 && { details }),
    ...(!isProduction && { timestamp: new Date().toISOString() }),
  };

  res.status(statusCode).json(response);
};
