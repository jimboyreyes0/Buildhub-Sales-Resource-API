import { Response } from "express";
import IApiResponse from "../interfaces/ApiResponse.interface";

export const sendResponse = <T = any>(
  res: Response,
  options: {
    statusCode: number;
    success?: boolean;
    data?: T;
    message?: string;
    meta?: Record<string, any>;
    headers?: Record<string, string>;
  }
): void => {
  const {
    statusCode,
    success = statusCode < 400,
    data,
    message,
    meta,
    headers = {},
  } = options;

  Object.entries(headers).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  const response: IApiResponse<T> = {
    success,
    statusCode,
    message: message || (success ? "Operation successful" : "Operation failed"),
    data,
    timestamp: new Date().toISOString(),
    path: res.req?.originalUrl,
    requestId: res.get("x-request-id"),
    meta,
  };

  Object.keys(response).forEach(
    (key) => response[key] === undefined && delete response[key]
  );

  res.status(statusCode).json(response);
};
